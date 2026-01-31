import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { MapPin, Mail, Instagram, Send } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`${API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Fehler beim Senden");

      toast.success("Nachricht erfolgreich gesendet!", {
        description: "Wir melden uns schnellstmöglich bei dir.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Fehler beim Senden", {
        description: "Bitte versuche es später erneut.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-midnight-pitch" data-testid="contact-page">
      {/* Hero */}
      <section className="py-24 bg-jersey-texture">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <span className="font-accent text-cyber-gold text-sm font-semibold uppercase tracking-wider">
            Kontakt
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mt-2">
            Kontaktiere Uns
          </h1>
          <p className="text-slate-300 text-lg mt-4 max-w-2xl">
            Du hast Fragen oder möchtest Teil unseres Vereins werden? Wir freuen uns auf deine Nachricht.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-jersey-texture border-white/10">
              <CardContent className="p-8">
                <h2 className="font-heading text-2xl text-white mb-6">Schreib uns</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-300">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-slate-900 border-slate-700 text-white"
                        placeholder="Dein Name"
                        data-testid="contact-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-300">E-Mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-slate-900 border-slate-700 text-white"
                        placeholder="deine@email.de"
                        data-testid="contact-email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-slate-300">Betreff</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-slate-900 border-slate-700 text-white"
                      placeholder="Betreff deiner Nachricht"
                      data-testid="contact-subject"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-300">Nachricht</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="bg-slate-900 border-slate-700 text-white resize-none"
                      placeholder="Deine Nachricht an uns..."
                      data-testid="contact-message"
                    />
                  </div>

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
                    SG Siemens München Ost e.V.<br />
                    St.-Cajetan-Straße 33<br />
                    81669 München
                  </address>
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
                    info@sg-siemens-ost.de
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
              <div className="bg-jersey-texture rounded-lg border border-white/10 h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-2" />
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
