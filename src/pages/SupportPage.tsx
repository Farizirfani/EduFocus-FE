import { Mail, MessageCircle, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';

export default function SupportPage() {
  const faqs = [
    { q: "How do I reset my password?", a: "Go to Profile > Change Password to update your credentials securely." },
    { q: "Can I download courses offline?", a: "Currently, offline support is in beta. Check back soon for updates!" },
    { q: "Where can I report a bug?", a: "You can email our support team directly or use the feedback form below." },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
         <h1 className="text-3xl font-bold text-dark-900 dark:text-dark-50 mb-4">How can we help you?</h1>
         <p className="text-dark-500 dark:text-dark-400 text-lg max-w-2xl mx-auto">
           Need assistance with your courses or account? We're here to support your learning journey every step of the way.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
         {[
           { icon: MessageCircle, title: "Live Chat", desc: "Chat with our support team", action: "Start Chat" },
           { icon: Mail, title: "Email Support", desc: "Get help via email", action: "Send Email" },
           { icon: HelpCircle, title: "Help Center", desc: "Browse detailed guides", action: "Visit Help Center" },
         ].map((item, i) => (
           <div key={i} className="bg-white dark:bg-dark-100 p-8 rounded-2xl border border-dark-100 dark:border-dark-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
              <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <item.icon size={28} className="text-primary-600 dark:text-primary-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-dark-900 dark:text-dark-50 mb-2">{item.title}</h3>
              <p className="text-dark-500 dark:text-dark-400 text-sm mb-6">{item.desc}</p>
              <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold text-sm group-hover:gap-3 transition-all">
                {item.action} <ArrowRight size={16} />
              </div>
           </div>
         ))}
      </div>

      <div className="bg-dark-50 dark:bg-dark-100/30 rounded-3xl p-10">
         <h2 className="text-xl font-bold text-dark-900 dark:text-dark-50 mb-8">Frequently Asked Questions</h2>
         <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-dark-100 p-6 rounded-xl border border-dark-100 dark:border-dark-100/50">
                <h4 className="font-semibold text-dark-800 dark:text-dark-200 mb-2 flex items-center gap-3">
                   <span className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-400 flex items-center justify-center text-xs">Q</span>
                   {faq.q}
                </h4>
                <p className="text-dark-500 dark:text-dark-400 text-sm pl-9">{faq.a}</p>
              </div>
            ))}
         </div>
      </div>
      
      <div className="mt-12 text-center">
         <a href="#" className="inline-flex items-center gap-2 text-dark-400 hover:text-primary-600 transition-colors text-sm font-medium">
            View all articles in Knowledge Base <ExternalLink size={14} />
         </a>
      </div>
    </div>
  );
}
