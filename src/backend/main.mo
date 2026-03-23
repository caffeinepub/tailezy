import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Storage Mixin
  include MixinStorage();

  // Access Control Mixin
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public type UserProfile = {
    name : Text;
    phone : Text;
    address : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Tailoring Service Types
  type OrderId = Nat;

  type CustomerDetails = {
    name : Text;
    phone : Text;
    address : Text;
  };

  type ServiceType = {
    #shirt;
    #pants;
    #dress;
  };

  type PaymentMethod = {
    #cash;
    #creditCard;
    #onlinePayment;
  };

  type OrderStatus = {
    #pending;
    #pickedUp;
    #inProgress;
    #delivered;
  };

  type TailoringOrder = {
    id : OrderId;
    owner : Principal;
    customerDetails : CustomerDetails;
    serviceType : ServiceType;
    pickupTime : Text;
    paymentMethod : PaymentMethod;
    status : OrderStatus;
    price : Nat;
  };

  type CreateOrderRequest = {
    customerDetails : CustomerDetails;
    serviceType : ServiceType;
    pickupTime : Text;
    paymentMethod : PaymentMethod;
  };

  var nextOrderId : OrderId = 1;

  module TailoringOrder {
    public func compare(tailoringOrder1 : TailoringOrder, tailoringOrder2 : TailoringOrder) : Order.Order {
      Nat.compare(tailoringOrder1.id, tailoringOrder2.id);
    };
  };

  let orders = Map.empty<OrderId, TailoringOrder>();

  func calculatePrice(serviceType : ServiceType) : Nat {
    switch (serviceType) {
      case (#shirt) { 20 };
      case (#pants) { 25 };
      case (#dress) { 30 };
    };
  };

  public shared ({ caller }) func createOrder(request : CreateOrderRequest) : async OrderId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create orders");
    };

    let price = calculatePrice(request.serviceType);
    let order : TailoringOrder = {
      id = nextOrderId;
      owner = caller;
      customerDetails = request.customerDetails;
      serviceType = request.serviceType;
      pickupTime = request.pickupTime;
      paymentMethod = request.paymentMethod;
      status = #pending;
      price;
    };

    orders.add(nextOrderId, order);
    nextOrderId += 1;
    order.id;
  };

  public query ({ caller }) func getOrder(id : OrderId) : async TailoringOrder {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view orders");
    };

    switch (orders.get(id)) {
      case (null) {
        Runtime.trap("Order does not exist");
      };
      case (?order) {
        // Users can only view their own orders, admins can view all
        if (order.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own orders");
        };
        order;
      };
    };
  };

  public shared ({ caller }) func updateOrderStatus(id : OrderId, status : OrderStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };

    switch (orders.get(id)) {
      case (null) {
        Runtime.trap("Order does not exist");
      };
      case (?order) {
        let updatedOrder = { order with status };
        orders.add(id, updatedOrder);
      };
    };
  };

  public query ({ caller }) func listOrders() : async [TailoringOrder] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can list orders");
    };

    let isAdmin = AccessControl.isAdmin(accessControlState, caller);

    if (isAdmin) {
      // Admins can see all orders
      orders.values().toArray().sort();
    } else {
      // Regular users can only see their own orders
      orders.values()
      .filter(func(order : TailoringOrder) : Bool { order.owner == caller })
      .toArray()
      .sort();
    };
  };

  public query ({ caller }) func getPriceEstimate(serviceType : ServiceType) : async Nat {
    // Public function - no auth check (guests can check prices)
    calculatePrice(serviceType);
  };
};
