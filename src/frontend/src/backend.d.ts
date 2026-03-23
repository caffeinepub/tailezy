import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type OrderId = bigint;
export interface CustomerDetails {
    name: string;
    address: string;
    phone: string;
}
export interface TailoringOrder {
    id: OrderId;
    status: OrderStatus;
    serviceType: ServiceType;
    paymentMethod: PaymentMethod;
    owner: Principal;
    customerDetails: CustomerDetails;
    pickupTime: string;
    price: bigint;
}
export interface CreateOrderRequest {
    serviceType: ServiceType;
    paymentMethod: PaymentMethod;
    customerDetails: CustomerDetails;
    pickupTime: string;
}
export interface UserProfile {
    name: string;
    address: string;
    phone: string;
}
export enum OrderStatus {
    pending = "pending",
    pickedUp = "pickedUp",
    delivered = "delivered",
    inProgress = "inProgress"
}
export enum PaymentMethod {
    creditCard = "creditCard",
    cash = "cash",
    onlinePayment = "onlinePayment"
}
export enum ServiceType {
    shirt = "shirt",
    pants = "pants",
    dress = "dress"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createOrder(request: CreateOrderRequest): Promise<OrderId>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getOrder(id: OrderId): Promise<TailoringOrder>;
    getPriceEstimate(serviceType: ServiceType): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listOrders(): Promise<Array<TailoringOrder>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateOrderStatus(id: OrderId, status: OrderStatus): Promise<void>;
}
