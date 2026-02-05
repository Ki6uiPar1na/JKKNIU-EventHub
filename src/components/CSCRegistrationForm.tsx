import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, AlertCircle, Copy } from "lucide-react";

type PaymentMethod = "Cash" | "Bkash" | "";

interface FormData {
  fullName: string;
  departmentName: string;
  session: string;
  contactNumber: string;
  email: string;
  payment: PaymentMethod;
  transactionId: string;
  currentStatus: string; // single selection
  thoughts: string;
  topSecret?: string;
}

const BKASH_NUMBER = "01916493404"; // TODO: replace if CSC uses a different number

const SESSION_OPTIONS = [
  "2020-21",
  "2021-22",
  "2022-23",
  "2023-24",
  "2024-25",
];

const STATUS_OPTIONS = [
  "I can view source code",
  "I can see cookies",
  "Hacked NASA using HTML",
  "I Don't trust frontends",
  "I use bruteforce",
  "I love finding bugs",
];

const CSCRegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    departmentName: "",
    session: "",
    contactNumber: "",
    email: "",
    payment: "",
    transactionId: "",
    currentStatus: "",
    thoughts: "",
    topSecret: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const { toast } = useToast();

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.departmentName.trim()) newErrors.departmentName = "Department Name is required";
    if (!formData.session) newErrors.session = "Session is required";

    if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact Number is required";
    else if (!/^\+?[0-9\-\s]{6,15}$/.test(formData.contactNumber)) newErrors.contactNumber = "Enter a valid phone number";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Enter a valid email";

    if (!formData.payment) newErrors.payment = "Payment method is required";
    if (formData.payment === "Bkash" && !formData.transactionId.trim()) {
      newErrors.transactionId = "Transaction ID is required for bKash";
    }

  if (!formData.currentStatus) newErrors.currentStatus = "Pick one status";
    if (!formData.thoughts.trim()) newErrors.thoughts = "This field is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // currentStatus will be updated via handleChange("currentStatus", value)

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const submitToGoogleForms = async () => {
    // TODO: Replace with the CSC Google Form VIEW URL
    const viewUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdvz35745KruFXod3ZBYcRI-BfZjfcYhGXWe8wzB1Z0p02sXA/viewform";
    const formResponseUrl = viewUrl.replace("/viewform", "/formResponse");

    // TODO: Replace entries below with the real entry IDs from Google Form (name="entry.xxxxxx")
    const entryMap = {
      fullName: "entry.692804130",
      departmentName: "entry.915308764",
      session: "entry.1634896924",
      contactNumber: "entry.188269576",
      email: "entry.1322572094",
      payment: "entry.2048202733",
      transactionId: "entry.890300529", // required only when payment = Bkash
  currentStatus: "entry.620390476", // single select value
      thoughts: "entry.1146824254",
      topSecret: "entry.435525581", // optional
    } as const;

    const fd = new FormData();
    fd.append(entryMap.fullName, formData.fullName);
    fd.append(entryMap.departmentName, formData.departmentName);
    fd.append(entryMap.session, formData.session);
    fd.append(entryMap.contactNumber, formData.contactNumber);
    fd.append(entryMap.email, formData.email);
    fd.append(entryMap.payment, formData.payment);
    if (formData.payment === "Bkash" && formData.transactionId) {
      fd.append(entryMap.transactionId, formData.transactionId);
    }
    // Append the selected status
    if (formData.currentStatus) {
      fd.append(entryMap.currentStatus, formData.currentStatus);
    }
    fd.append(entryMap.thoughts, formData.thoughts);
    if (formData.topSecret) fd.append(entryMap.topSecret, formData.topSecret);

    try {
      await fetch(formResponseUrl, { method: "POST", mode: "no-cors", body: fd });
      return true;
    } catch (err) {
      console.error("CSC form submission error:", err);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({ title: "Please fix the errors", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    const success = await submitToGoogleForms();
    if (success) {
      toast({ title: "Submitted!", description: "Your CSC application has been received." });
      setFormData({
        fullName: "",
        departmentName: "",
        session: "",
        contactNumber: "",
        email: "",
        payment: "",
        transactionId: "",
        currentStatus: "",
        thoughts: "",
        topSecret: "",
      });
    } else {
      toast({ title: "Submission failed", description: "Try again later.", variant: "destructive" });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-surface-variant py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elevated">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                JKKNIU Cyber Security Club — Member Recruitment
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Open for all (within JKKNIU). Fill out the form below.
              </CardDescription>

              {/* bKash number notice */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <p className="text-sm text-foreground">
                  Pay via bKash:
                  <span className="ml-2 font-semibold">{BKASH_NUMBER}</span>
                </p>
                <Button
                  type="button"
                  className="py-1 px-2 text-sm"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(BKASH_NUMBER);
                      toast({ title: "Copied", description: "bKash number copied." });
                    } catch (err) {
                      console.error(err);
                      toast({ title: "Copy failed", variant: "destructive" });
                    }
                  }}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className={errors.fullName ? "border-error" : ""}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-error text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Department Name */}
                <div className="space-y-2">
                  <Label htmlFor="departmentName">Department Name *</Label>
                  <Input
                    id="departmentName"
                    value={formData.departmentName}
                    onChange={(e) => handleChange("departmentName", e.target.value)}
                    className={errors.departmentName ? "border-error" : ""}
                    placeholder="e.g., CSE, EEE, Mathematics"
                  />
                  {errors.departmentName && (
                    <p className="text-error text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> {errors.departmentName}
                    </p>
                  )}
                </div>

                {/* Session, Contact, Email */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="session">Session *</Label>
                    <Select value={formData.session} onValueChange={(v) => handleChange("session", v)}>
                      <SelectTrigger className={errors.session ? "border-error bg-popover" : "border-input bg-popover"}>
                        <SelectValue placeholder="Select session" />
                      </SelectTrigger>
                      <SelectContent>
                        {SESSION_OPTIONS.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.session && <p className="text-error text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {errors.session}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact Number *</Label>
                    <Input
                      id="contactNumber"
                      value={formData.contactNumber}
                      onChange={(e) => handleChange("contactNumber", e.target.value)}
                      className={errors.contactNumber ? "border-error" : ""}
                      placeholder="e.g., 01XXXXXXXXX"
                    />
                    {errors.contactNumber && <p className="text-error text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {errors.contactNumber}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={errors.email ? "border-error" : ""}
                      placeholder="your.name@jkkniu.edu.bd"
                    />
                    {errors.email && <p className="text-error text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {errors.email}</p>}
                  </div>
                </div>

                {/* Payment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="payment">Payment *</Label>
                    <Select value={formData.payment} onValueChange={(v) => handleChange("payment", v)}>
                      <SelectTrigger className={errors.payment ? "border-error bg-popover" : "border-input bg-popover"}>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Bkash">Bkash</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.payment && <p className="text-error text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {errors.payment}</p>}

                    {formData.payment === "Bkash" && (
                      <div className="mt-2 space-y-2">
                        <Label htmlFor="transactionId">bKash Transaction ID *</Label>
                        <Input
                          id="transactionId"
                          value={formData.transactionId}
                          onChange={(e) => handleChange("transactionId", e.target.value)}
                          className={errors.transactionId ? "border-error" : ""}
                          placeholder="Enter bKash transaction id"
                        />
                        {errors.transactionId && <p className="text-error text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {errors.transactionId}</p>}
                      </div>
                    )}
                  </div>

                  {/* Current Status (single select) */}
                  <div className="space-y-2">
                    <Label>Current Status *</Label>
                    <RadioGroup
                      value={formData.currentStatus}
                      onValueChange={(v) => handleChange("currentStatus", v)}
                      className="grid grid-cols-1 gap-2"
                    >
                      {STATUS_OPTIONS.map((status) => {
                        const id = `status-${status.replace(/\s+/g, "-").toLowerCase()}`;
                        return (
                          <div key={status} className="flex items-center gap-2 text-sm">
                            <RadioGroupItem id={id} value={status} />
                            <Label htmlFor={id} className="font-normal cursor-pointer">{status}</Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                    {errors.currentStatus && <p className="text-error text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {errors.currentStatus}</p>}
                  </div>
                </div>

                {/* Thoughts (required) */}
                <div className="space-y-2">
                  <Label htmlFor="thoughts">Thoughts about Cyber Security *</Label>
                  <Textarea
                    id="thoughts"
                    value={formData.thoughts}
                    onChange={(e) => handleChange("thoughts", e.target.value)}
                    className={errors.thoughts ? "border-error" : ""}
                    placeholder="Share your thoughts..."
                  />
                  {errors.thoughts && <p className="text-error text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {errors.thoughts}</p>}
                </div>

                {/* Top Secret (optional) */}
                <div className="space-y-2">
                  <Label htmlFor="topSecret">The Top Secret (Optional)</Label>
                  <Textarea
                    id="topSecret"
                    value={formData.topSecret}
                    onChange={(e) => handleChange("topSecret", e.target.value)}
                    placeholder="Optional — share anything else"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-primary hover:opacity-90 glow-primary text-lg py-6 flex justify-center items-center gap-2"
                >
                  {isSubmitting ? (<><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>) : (<><CheckCircle className="w-5 h-5" /> Submit Application</>)}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CSCRegistrationForm;
