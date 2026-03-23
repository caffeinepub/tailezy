import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateOrder,
  useGetOrder,
  useGetPriceEstimate,
} from "@/hooks/useQueries";
import { CheckCircle2, Loader2, MessageCircle, Upload } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { OrderStatus, PaymentMethod, ServiceType } from "../backend.d";
import type { OrderId } from "../backend.d";

const serviceOptions = [
  { label: "Alteration", value: ServiceType.shirt, hours: 4 },
  { label: "Stitching", value: ServiceType.pants, hours: 8 },
  { label: "Urgent", value: ServiceType.dress, hours: 2 },
];

const paymentOptions = [
  { label: "UPI", value: PaymentMethod.onlinePayment },
  { label: "Card", value: PaymentMethod.creditCard },
  { label: "Cash on Delivery", value: PaymentMethod.cash },
];

const statusSteps: { key: OrderStatus; label: string }[] = [
  { key: OrderStatus.pending, label: "Order Placed" },
  { key: OrderStatus.pickedUp, label: "Picked Up" },
  { key: OrderStatus.inProgress, label: "In Progress" },
  { key: OrderStatus.delivered, label: "Delivered" },
];

function getStatusProgress(status: OrderStatus): number {
  const map: Record<OrderStatus, number> = {
    [OrderStatus.pending]: 25,
    [OrderStatus.pickedUp]: 50,
    [OrderStatus.inProgress]: 75,
    [OrderStatus.delivered]: 100,
  };
  return map[status] ?? 0;
}

function getStatusIndex(status: OrderStatus): number {
  return statusSteps.findIndex((s) => s.key === status);
}

export default function OrderPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [serviceType, setServiceType] = useState<ServiceType | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.onlinePayment,
  );
  const [pickupTime, setPickupTime] = useState("");
  const [fileName, setFileName] = useState("");
  const [placedOrderId, setPlacedOrderId] = useState<OrderId | null>(null);

  const { data: priceEstimate, isLoading: priceLoading } =
    useGetPriceEstimate(serviceType);
  const createOrderMutation = useCreateOrder();
  const { data: orderData } = useGetOrder(placedOrderId);

  const selectedService = serviceOptions.find((s) => s.value === serviceType);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!serviceType) {
      toast.error("Please select a service type.");
      return;
    }
    if (!pickupTime) {
      toast.error("Please select a pickup time.");
      return;
    }

    try {
      const orderId = await createOrderMutation.mutateAsync({
        serviceType,
        paymentMethod,
        customerDetails: { name, address, phone },
        pickupTime,
      });
      setPlacedOrderId(orderId);
      toast.success("Order placed successfully!");
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  }

  const currentStatus = orderData?.status ?? OrderStatus.pending;
  const statusIdx = getStatusIndex(currentStatus);

  return (
    <div className="pt-16 pb-20 bg-secondary min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-3">
            Start Your Order
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold">
            Book a Tailoring Service
          </h1>
          <div className="w-12 h-px bg-gold mx-auto mt-4" />
        </motion.div>

        {/* Order Tracking (shown after order placed) */}
        {placedOrderId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark p-7 mb-10"
            data-ocid="order.success_state"
          >
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="w-6 h-6 text-gold" />
              <h2 className="font-serif text-lg font-semibold text-white">
                Order Tracking
              </h2>
            </div>
            <p className="text-white/50 text-xs mb-4">
              Order ID: #{placedOrderId.toString()}
            </p>
            <Progress
              value={getStatusProgress(currentStatus)}
              className="h-2 mb-6 [&>div]:bg-gold"
            />
            <div className="flex justify-between">
              {statusSteps.map((s, i) => (
                <div
                  key={s.key}
                  className="flex flex-col items-center gap-1"
                  data-ocid={`order.item.${i + 1}` as string}
                >
                  <div
                    className={`w-3 h-3 rounded-full transition-colors ${
                      i <= statusIdx ? "bg-gold" : "bg-white/20"
                    }`}
                  />
                  <span
                    className={`text-xs text-center leading-tight ${
                      i <= statusIdx
                        ? "text-gold font-semibold"
                        : "text-white/40"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Order Form */}
        {!placedOrderId && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-white p-8 md:p-10 space-y-6"
            data-ocid="order.modal"
          >
            {/* Name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-xs font-bold tracking-widest uppercase"
              >
                Full Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Arjun Mehta"
                required
                className="focus-visible:ring-gold"
                data-ocid="order.input"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-xs font-bold tracking-widest uppercase"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                required
                className="focus-visible:ring-gold"
                data-ocid="order.input"
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label
                htmlFor="address"
                className="text-xs font-bold tracking-widest uppercase"
              >
                Pickup Address
              </Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="12, Park Lane, Bandra West, Mumbai 400050"
                required
                rows={3}
                className="focus-visible:ring-gold resize-none"
                data-ocid="order.textarea"
              />
            </div>

            {/* Service Type */}
            <div className="space-y-2">
              <Label className="text-xs font-bold tracking-widest uppercase">
                Service Type
              </Label>
              <Select onValueChange={(v) => setServiceType(v as ServiceType)}>
                <SelectTrigger
                  className="focus:ring-gold"
                  data-ocid="order.select"
                >
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price + Delivery Estimate */}
            {serviceType && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-secondary p-4 border border-border"
                data-ocid="order.panel"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                      Estimated Delivery
                    </p>
                    <p className="font-serif font-semibold">
                      {selectedService?.hours} hours
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                      Estimated Price
                    </p>
                    {priceLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin text-gold ml-auto" />
                    ) : (
                      <p className="font-serif font-semibold text-gold">
                        ₹
                        {priceEstimate !== undefined
                          ? Number(priceEstimate)
                          : "--"}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Upload */}
            <div className="space-y-2">
              <Label className="text-xs font-bold tracking-widest uppercase">
                Upload Clothing Image
              </Label>
              <label
                className="flex items-center gap-3 border-2 border-dashed border-border hover:border-gold transition-colors p-5 cursor-pointer"
                data-ocid="order.upload_button"
              >
                <Upload className="w-5 h-5 text-gold" />
                <span className="text-sm text-muted-foreground">
                  {fileName || "Click to upload image (JPG, PNG)"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                />
              </label>
            </div>

            {/* Pickup Time */}
            <div className="space-y-2">
              <Label
                htmlFor="pickupTime"
                className="text-xs font-bold tracking-widest uppercase"
              >
                Select Pickup Time
              </Label>
              <Input
                id="pickupTime"
                type="datetime-local"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                required
                className="focus-visible:ring-gold"
                data-ocid="order.input"
              />
            </div>

            {/* Payment */}
            <div className="space-y-3">
              <Label className="text-xs font-bold tracking-widest uppercase">
                Payment Method
              </Label>
              <div className="flex gap-4 flex-wrap">
                {paymentOptions.map((p) => (
                  <label
                    key={p.value}
                    className={`flex items-center gap-2 px-4 py-2 border cursor-pointer text-sm font-medium transition-all ${
                      paymentMethod === p.value
                        ? "border-gold bg-gold/10 text-foreground"
                        : "border-border hover:border-gold/50"
                    }`}
                    data-ocid="order.radio"
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={p.value}
                      checked={paymentMethod === p.value}
                      onChange={() => setPaymentMethod(p.value)}
                      className="accent-gold"
                    />
                    {p.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={createOrderMutation.isPending}
              className="w-full bg-gold text-foreground hover:bg-gold-dark font-bold tracking-widest uppercase text-sm py-6 rounded-none"
              data-ocid="order.submit_button"
            >
              {createOrderMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Placing Order...
                </>
              ) : (
                "Place Order"
              )}
            </Button>
          </motion.form>
        )}
      </div>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20with%20a%20tailoring%20order%20on%20tailEzy!"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        style={{ backgroundColor: "#25D366" }}
        aria-label="Chat on WhatsApp"
        data-ocid="order.button"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
}
