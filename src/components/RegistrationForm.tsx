import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, AlertCircle, Copy } from "lucide-react";

interface FormData {
  fullName: string;
  roll: string;
  registrationNumber: string;
  gender: "Male" | "Female" | "";
  paymentMethod: string;
  codeforceHandle: string;
  vjudgeHandle: string;
  transactionId: string;
}

const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    roll: "",
    registrationNumber: "",
    gender: "",
    paymentMethod: "",
    codeforceHandle: "",
    vjudgeHandle: "",
    transactionId: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  // errors should map form fields to string messages, not reuse FormData types
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const { toast } = useToast();

  const paymentMethods = ["Cash - CR", "bKash - 01306220829"]; // added bKash payment option
  const genders = ["Male", "Female"];
  const BKASH_NUMBER = "01306220829";
  const REGISTRATION_FEE_TK = 200;

  const validateForm = (): boolean => {
  const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = "Full name must contain only alphabets";
    }

    if (!formData.roll.trim()) newErrors.roll = "Roll number is required";
    if (!formData.registrationNumber.trim()) newErrors.registrationNumber = "Registration number is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.paymentMethod) newErrors.paymentMethod = "Payment method is required";

    // If bKash selected, transaction id is required
    if (formData.paymentMethod && formData.paymentMethod.toLowerCase().includes("bkash") && !formData.transactionId.trim()) {
      newErrors.transactionId = "Transaction ID is required for bKash payments";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const submitToGoogleForms = async () => {
    // Replace view URL below with the target form view URL if different
    const viewUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSfA6MeCkrmSvluHbPd-udsT6c5noJhf07l1xgTUc4wZpP09pw/viewform";
    const formResponseUrl = viewUrl.replace("/viewform", "/formResponse");

    // TODO: Replace the placeholder entry IDs below with the real entry IDs from your Google Form.
    // To get entry IDs: open the form, inspect the input element name attributes (name="entry.XXXXXXXX")
    const entryMap: Record<keyof FormData, string> = {
      fullName: "entry.1613976863",           // e.g. entry.1234567890
      roll: "entry.2105077340",
      registrationNumber: "entry.221189295",
      gender: "entry.2081839725",
      paymentMethod: "entry.47691962",
      codeforceHandle: "entry.185925211",
      vjudgeHandle: "entry.1427272081",
      // TODO: replace with your Google Form's entry ID for the transaction id field
      transactionId: "entry.2007854264",
    };

    const formDataToSubmit = new FormData();
    formDataToSubmit.append(entryMap.fullName, formData.fullName);
    formDataToSubmit.append(entryMap.roll, formData.roll);
    formDataToSubmit.append(entryMap.registrationNumber, formData.registrationNumber);
    formDataToSubmit.append(entryMap.gender, formData.gender);
    formDataToSubmit.append(entryMap.paymentMethod, formData.paymentMethod);
    formDataToSubmit.append(entryMap.codeforceHandle, formData.codeforceHandle);
    formDataToSubmit.append(entryMap.vjudgeHandle, formData.vjudgeHandle);
    // Append transaction id (if configured in entryMap)
    if (entryMap.transactionId) {
      formDataToSubmit.append(entryMap.transactionId, formData.transactionId);
    }

    try {
      await fetch(formResponseUrl, {
        method: "POST",
        mode: "no-cors",
        body: formDataToSubmit,
      });
      return true;
    } catch (error) {
      console.error("Form submission error:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors below",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const success = await submitToGoogleForms();

    if (success) {
      toast({
        title: "Registration Successful! 🎉",
        description: "We've received your registration.",
      });
      setFormData({
        fullName: "",
        roll: "",
        registrationNumber: "",
        gender: "",
        paymentMethod: "",
        codeforceHandle: "",
        vjudgeHandle: "",
        transactionId: "",
      });
    } else {
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
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
                Mid Day Recruit 2026 - Registration
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Fill out the form below to register
              </CardDescription>

              {/* Fee notice */}
              <div className="mt-2 flex items-center justify-center">
                <Badge className="bg-gradient-primary text-primary-foreground">Registration Fee: {REGISTRATION_FEE_TK} Tk</Badge>
              </div>

              {/* bKash number notice (top) */}
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
                      toast({ title: "Copied", description: "bKash number copied to clipboard." });
                    } catch (err) {
                      console.error(err);
                      toast({ title: "Copy failed", description: "Unable to copy number.", variant: "destructive" });
                    }
                  }}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className={errors.fullName ? "border-error" : ""}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-error text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Roll & Registration Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="roll">Roll *</Label>
                    <Input
                      id="roll"
                      value={formData.roll}
                      onChange={(e) => handleInputChange("roll", e.target.value)}
                      className={errors.roll ? "border-error" : ""}
                      placeholder="e.g., 22102017"
                    />
                    {errors.roll && <p className="text-error text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {errors.roll}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">Registration Number *</Label>
                    <Input
                      id="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                      className={errors.registrationNumber ? "border-error" : ""}
                      placeholder="Registration number"
                    />
                    {errors.registrationNumber && <p className="text-error text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {errors.registrationNumber}</p>}
                  </div>
                </div>

                {/* Gender & Payment Method */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(v) => handleInputChange("gender", v as FormData["gender"])}>
                      <SelectTrigger className={errors.gender ? "border-error bg-popover" : "border-input bg-popover"}>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {genders.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    {errors.gender && <p className="text-error text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {errors.gender}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Payment Method *</Label>
                    <Select value={formData.paymentMethod} onValueChange={(v) => handleInputChange("paymentMethod", v)}>
                      <SelectTrigger className={errors.paymentMethod ? "border-error bg-popover" : "border-input bg-popover"}>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                      </SelectContent>
                    </Select>
                                    {errors.paymentMethod && <p className="text-error text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {errors.paymentMethod}</p>}

                                    {/* If bKash selected, show transaction id input */}
                                    {formData.paymentMethod && formData.paymentMethod.toLowerCase().includes("bkash") && (
                                      <div className="mt-2 space-y-2">
                                        <Label htmlFor="transactionId">bKash Transaction ID *</Label>
                                        <Input
                                          id="transactionId"
                                          value={formData.transactionId}
                                          onChange={(e) => handleInputChange("transactionId", e.target.value)}
                                          className={errors.transactionId ? "border-error" : ""}
                                          placeholder="Enter bKash transaction id"
                                        />
                                        {errors.transactionId && (
                                          <p className="text-error text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {errors.transactionId}</p>
                                        )}
                                      </div>
                                    )}
                  </div>
                </div>

                {/* Handles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="codeforceHandle">Codeforce Handle</Label>
                    <Input
                      id="codeforceHandle"
                      value={formData.codeforceHandle}
                      onChange={(e) => handleInputChange("codeforceHandle", e.target.value)}
                      placeholder="Codeforce username required"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vjudgeHandle">Vjudge Handle</Label>
                    <Input
                      id="vjudgeHandle"
                      value={formData.vjudgeHandle}
                      onChange={(e) => handleInputChange("vjudgeHandle", e.target.value)}
                      placeholder="Vjudge username required"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-primary hover:opacity-90 glow-primary text-lg py-6 flex justify-center items-center gap-2"
                >
                  {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Registering...</> 
                  : <><CheckCircle className="w-5 h-5" /> Register Now</>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
