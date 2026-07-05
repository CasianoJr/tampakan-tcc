import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { contactInfo, departments } from '../data/contact'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <section className="relative flex min-h-[30svh] items-center justify-center overflow-hidden px-4 text-center text-cloud-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/TCC_building.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-harvest-green/85 to-deep-soil/90" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-3xl font-bold md:text-4xl">Contact Us</h1>
          <p className="mx-auto mt-2 max-w-2xl text-sky-field/80">
            Get in touch with the TCC administration
          </p>
        </motion.div>
      </section>

      <section className="bg-cloud-white px-4 py-16">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-6 text-2xl font-bold text-deep-soil">
              Send Us a Message
            </h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl border border-success-sprout/30 bg-success-sprout/5 p-8 text-center"
              >
                <Send size={40} className="mx-auto mb-4 text-success-sprout" />
                <h3 className="mb-2 text-lg font-bold text-deep-soil">
                  Message Sent!
                </h3>
                <p className="text-sm text-slate-ink/70">
                  Thank you for reaching out. We will get back to you as soon as possible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-deep-soil">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-deep-soil">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-deep-soil">
                    Department
                  </label>
                  <select className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green">
                    {departments.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-deep-soil">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-deep-soil">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    className="w-full resize-none rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-harvest-green px-6 py-2.5 text-sm font-semibold text-cloud-white transition-colors hover:bg-deep-soil"
                >
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="mb-6 text-2xl font-bold text-deep-soil">
              Contact Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-harvest-green" />
                <div>
                  <p className="font-medium text-deep-soil">Address</p>
                  <p className="text-sm text-slate-ink/70">{contactInfo.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={20} className="mt-0.5 shrink-0 text-harvest-green" />
                <div>
                  <p className="font-medium text-deep-soil">Phone</p>
                  <p className="text-sm text-slate-ink/70">{contactInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={20} className="mt-0.5 shrink-0 text-harvest-green" />
                <div>
                  <p className="font-medium text-deep-soil">Email</p>
                  <p className="text-sm text-slate-ink/70">{contactInfo.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={20} className="mt-0.5 shrink-0 text-harvest-green" />
                <div>
                  <p className="font-medium text-deep-soil">Office Hours</p>
                  <p className="text-sm text-slate-ink/70">{contactInfo.officeHours}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-sky-field p-6">
              <h3 className="mb-2 font-bold text-deep-soil">Location</h3>
              <div className="aspect-[16/9] overflow-hidden rounded-lg bg-harvest-green/10 flex items-center justify-center text-sm text-slate-ink/50">
                <div className="text-center p-4">
                  <MapPin size={32} className="mx-auto mb-2 text-harvest-green" />
                  <p>Former Koronadal Academy Site</p>
                  <p>Poblacion, Tampakan, South Cotabato</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
