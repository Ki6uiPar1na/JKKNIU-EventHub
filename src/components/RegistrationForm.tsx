import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface FormData {
  fullName: string;
  session: string;
  department: string;
  roll: string;
  eventType: string;
  phone: string;
  email: string;
}

const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    session: "",
    department: "",
    roll: "",
    eventType: "",
    phone: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const { toast } = useToast();

  const eventTypes = ["CTF"];
  const sessions = ["2021-22", "2022-23", "2023-24"];
  const departments = ["CSE", "Others"];

  const validateForm = (): boolean => {
  const newErrors: Partial<FormData> = {};

  // Full Name: Only alphabets and spaces
  if (!formData.fullName.trim()) {
    newErrors.fullName = "Full name is required";
  } else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
    newErrors.fullName = "Full name must contain only alphabets";
  }

  if (!formData.session) newErrors.session = "Session is required";
  if (!formData.department) newErrors.department = "Department is required";
  if (!formData.eventType) newErrors.eventType = "Event type is required";

  // Roll number validation
if (!formData.roll.trim()) {
  newErrors.roll = "Roll number is required";
} else {
  const sessionYear = formData.session.split("-")[1].slice(-2); // e.g., 2021-22 -> "22"
const rollRegex = new RegExp(`^${sessionYear}\\d{6}$`);
if (!rollRegex.test(formData.roll)) {
  newErrors.roll = `Roll must be 8 digits starting with session year: ${sessionYear}XXXXXX`;
}
}


  // Phone: Bangladesh 11-digit number starting with 01[3-9]
  if (!formData.phone.trim()) {
    newErrors.phone = "Phone number is required";
  } else if (!/^01[3-9]\d{8}$/.test(formData.phone)) {
    newErrors.phone = "Phone number must be a valid BD number (11 digits, starts with 01)";
  }

  // Email validation
  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = "Invalid email format";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};



  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const submitToGoogleForms = async () => {
    const googleFormUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSfUDSgfNDtALGfNMJ_zzHXrX1eQkCfVOSBKocLB68JUiU2WVA/formResponse";

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("entry.1836682711", formData.fullName);
    formDataToSubmit.append("entry.111053289", formData.session);
    formDataToSubmit.append("entry.2023555666", formData.department);
    formDataToSubmit.append("entry.1183827453", formData.roll);
    formDataToSubmit.append("entry.1318942523", formData.eventType);
    formDataToSubmit.append("entry.2144218566", formData.phone);
    formDataToSubmit.append("entry.1782893864", formData.email);

    try {
      await fetch(googleFormUrl, {
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
        session: "",
        department: "",
        roll: "",
        eventType: "",
        phone: "",
        email: "",
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
                Event Registration
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Fill out the form below to register for our upcoming tech events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
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

                {/* Session & Department */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="session">Session *</Label>
                    <Select value={formData.session} onValueChange={(v) => handleInputChange("session", v)}>
                      <SelectTrigger className={errors.session ? "border-error" : ""}>
                        <SelectValue placeholder="Select session" />
                      </SelectTrigger>
                      <SelectContent>
                        {sessions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Select value={formData.department} onValueChange={(v) => handleInputChange("department", v)}>
                      <SelectTrigger className={errors.department ? "border-error" : ""}>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Roll & Event Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="roll">Roll Number *</Label>
                    <Input
                      id="roll"
                      value={formData.roll}
                      onChange={(e) => handleInputChange("roll", e.target.value)}
                      className={errors.roll ? "border-error" : ""}
                      placeholder="e.g., 22102017"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eventType">Event Type *</Label>
                    <Select value={formData.eventType} onValueChange={(v) => handleInputChange("eventType", v)}>
                      <SelectTrigger className={errors.eventType ? "border-error" : ""}>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Phone & Email */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="space-y-2">
    <Label htmlFor="phone">Phone Number *</Label>
    <Input
      id="phone"
      type="text"              // Preserve leading 0
      value={formData.phone}
      onChange={(e) => handleInputChange("phone", e.target.value)}
      className={errors.phone ? "border-error" : ""}
      placeholder="01XXXXXXXXX"
      maxLength={11}           // Optional: ensures max 11 digits
    />
    {errors.phone && (
      <p className="text-error text-sm flex items-center gap-2">
        <AlertCircle className="w-4 h-4" /> {errors.phone}
      </p>
    )}
  </div>

  <div className="space-y-2">
    <Label htmlFor="email">Email Address *</Label>
    <Input
      id="email"
      value={formData.email}
      onChange={(e) => handleInputChange("email", e.target.value)}
      className={errors.email ? "border-error" : ""}
      placeholder="john@example.com"
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
