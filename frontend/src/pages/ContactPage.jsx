import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { MapPin, Mail, Instagram, Send, Phone, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [notRobot, setNotRobot] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // E-Mail Validierung
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // E-Mail sofort validieren während der Eingabe
    if (name === "email") {
      if (value && !validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: "Bitte gib eine gültige E-Mail-Adresse ein (z.B. name@beispiel.de)" }));
      } else {
        setErrors(prev => ({ ...prev, email: null }));
      }
    } else {
      // Fehler entfernen wenn Feld korrigiert wird
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: null }));
      }
    }
  };

  // Validierung beim Verlassen des E-Mail-Feldes
  const handleEmailBlur = () => {
    if (formData.email && !validateEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: "Bitte gib eine gültige E-Mail-Adresse ein (z.B. name@beispiel.de)" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Bitte gib deinen Namen ein";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Bitte gib deine E-Mail-Adresse ein";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Bitte gib eine gültige E-Mail-Adresse ein";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Bitte gib einen Betreff ein";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Bitte gib eine Nachricht ein";
    }

    if (!notRobot) {
      newErrors.robot = "Bitte bestätige, dass du kein Roboter bist";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Bitte überprüfe deine Eingaben", {
        description: "Es gibt Fehler im Formular.",
      });
      return;
    }

    setSubmitting(true);

    try {
      // Formspree Integration
      const response = await fetch("https://formspree.io/f/xykjqwzp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `Kontaktanfrage: ${formData.subject}`,
        }),
      });

      if (response.ok) {
        toast.success("Nachricht erfolgreich gesendet!", {
          description: "Wir melden uns schnellstmöglich bei dir.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setNotRobot(false);
      } else {
        throw new Error("Fehler beim Senden");
      }
    } catch (error) {
      const mailtoLink = `mailto:info@sgsiemensost-fussball.de?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nE-Mail: ${formData.email}\n\n${formData.message}`
      )}`;
      window.location.href = mailtoLink;
      
      toast.info("E-Mail-Client geöffnet", {
        description: "Bitte sende die E-Mail über dein E-Mail-Programm.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-midnight-pitch" data-testid="contact-page">
      {/* Hero */}
      <section className="py-16 sm:py-20 md:py-24 bg-jersey-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <span className="font-accent text-cyber-gold text-xs sm:text-sm font-semibold uppercase tracking-wider">
            Kontakt
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mt-2">
            Kontaktiere Uns
          </h1>
          <p className="text-slate-300 text-base sm:text-lg mt-4 max-w-2xl">
            Du hast Fragen oder möchtest Teil unseres Vereins werden? Wir freuen uns auf deine Nachricht.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Form */}
            <Card className="bg-jersey-texture border-white/10">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <h2 className="font-heading text-xl sm:text-2xl text-white mb-4 sm:mb-6">Schreib uns</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-300">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`bg-slate-900 border-slate-700 text-white ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Dein Name"
                        data-testid="contact-name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-300">E-Mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`bg-slate-900 border-slate-700 text-white ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="deine@email.de"
                        data-testid="contact-email"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-slate-300">Betreff *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`bg-slate-900 border-slate-700 text-white ${errors.subject ? 'border-red-500' : ''}`}
                      placeholder="Betreff deiner Nachricht"
                      data-testid="contact-subject"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-300">Nachricht *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`bg-slate-900 border-slate-700 text-white resize-none ${errors.message ? 'border-red-500' : ''}`}
                      placeholder="Deine Nachricht an uns..."
                      data-testid="contact-message"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Robot Checkbox */}
                  <div className="space-y-2">
                    <div className={`flex items-center gap-3 p-4 rounded-lg border ${errors.robot ? 'border-red-500 bg-red-500/10' : 'border-white/10 bg-slate-900/50'}`}>
                      <Checkbox
                        id="not-robot"
                        checked={notRobot}
                        onCheckedChange={(checked) => {
                          setNotRobot(checked);
                          if (errors.robot) {
                            setErrors(prev => ({ ...prev, robot: null }));
                          }
                        }}
                        className="border-slate-500 data-[state=checked]:bg-electric-royal data-[state=checked]:border-electric-royal"
                        data-testid="contact-robot-checkbox"
                      />
                      <Label htmlFor="not-robot" className="text-slate-300 cursor-pointer select-none">
                        Ich bin kein Roboter
                      </Label>
                    </div>
                    {errors.robot && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.robot}
                      </p>
                    )}
                  </div>

                  {/* Honeypot für Spam-Schutz (versteckt) */}
                  <input type="text" name="_gotcha" style={{ display: 'none' }} />

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-electric-royal hover:bg-blue-600 text-white font-heading uppercase tracking-wider"
                    data-testid="contact-submit"
                  >
                    {submitting ? (
                      "Wird gesendet..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Nachricht senden
                      </>
                    )}
                  </Button>

                  <p className="text-slate-500 text-xs text-center">
                    * Pflichtfelder. Mit dem Absenden stimmst du unserer{" "}
                    <a href="/datenschutz" className="text-electric-royal hover:underline">
                      Datenschutzerklärung
                    </a>{" "}
                    zu.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Address */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-electric-royal/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-electric-royal" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-white mb-2">Adresse</h3>
                  <address className="text-slate-400 not-italic">
                    Sportgemeinschaft Siemens München Ost e.V.<br />
                    St.-Cajetan-Straße 33<br />
                    81669 München
                  </address>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-electric-royal/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-electric-royal" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-white mb-2">Telefon</h3>
                  <p className="text-slate-400">
                    <a href="tel:+498940268600" className="hover:text-cyber-gold">
                      +49 (0) 89 4026-8600
                    </a>
                  </p>
                  <p className="text-slate-500 text-sm">
                    Fax: +49 (0) 89 4026-9028
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-electric-royal/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-electric-royal" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-white mb-2">E-Mail</h3>
                  <p className="text-slate-400">
                    <a href="mailto:info@sgsiemensost-fussball.de" className="hover:text-cyber-gold">
                      info@sgsiemensost-fussball.de
                    </a>
                  </p>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-white mb-2">Instagram</h3>
                  <a 
                    href="https://www.instagram.com/sg_siemens_ost_infineon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-cyber-gold"
                  >
                    @sg_siemens_ost_infineon
                  </a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-jersey-texture rounded-lg border border-white/10 h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm">
                    St.-Cajetan-Straße 33, München
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
