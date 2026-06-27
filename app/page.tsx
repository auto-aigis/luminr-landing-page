"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Brain,
  TrendingUp,
  Eye,
  Zap,
  Shield,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Target,
  Layers,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features: Feature[] = [
    {
      icon: <Eye className="h-6 w-6 text-violet-500" />,
      title: "Brand Perception Audits",
      description:
        "Understand how AI models perceive and represent your brand across ChatGPT, Perplexity, Gemini, and other AI search engines.",
    },
    {
      icon: <Search className="h-6 w-6 text-violet-500" />,
      title: "AI Search Visibility Tracking",
      description:
        "Monitor your brand presence across AI-powered search experiences in real-time with comprehensive dashboards.",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-violet-500" />,
      title: "Opportunity Discovery",
      description:
        "Identify untapped opportunities where your brand can gain visibility in AI-generated responses and recommendations.",
    },
    {
      icon: <Brain className="h-6 w-6 text-violet-500" />,
      title: "Competitive Intelligence",
      description:
        "Compare your AI search presence against competitors and uncover strategic gaps to exploit.",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-violet-500" />,
      title: "Performance Analytics",
      description:
        "Deep analytics on how your visibility changes over time with actionable insights and trend detection.",
    },
    {
      icon: <Shield className="h-6 w-6 text-violet-500" />,
      title: "Brand Safety Monitoring",
      description:
        "Get alerted when AI models misrepresent your brand or associate it with inaccurate information.",
    },
  ];

  const steps: Step[] = [
    {
      number: "01",
      title: "Connect Your Brand",
      description:
        "Set up your brand profile with key identifiers, competitors, and target topics to monitor across AI search platforms.",
      icon: <Target className="h-8 w-8 text-violet-500" />,
    },
    {
      number: "02",
      title: "Audit & Analyze",
      description:
        "Our platform scans AI search engines to understand how your brand is perceived, mentioned, and recommended.",
      icon: <Layers className="h-8 w-8 text-violet-500" />,
    },
    {
      number: "03",
      title: "Discover Opportunities",
      description:
        "Receive actionable insights on where your brand can improve visibility and how to influence AI-generated responses.",
      icon: <Sparkles className="h-8 w-8 text-violet-500" />,
    },
    {
      number: "04",
      title: "Grow & Optimize",
      description:
        "Implement strategic recommendations and track your progress as your AI search visibility improves over time.",
      icon: <Zap className="h-8 w-8 text-violet-500" />,
    },
  ];

  const pricingPlans: PricingPlan[] = [
    {
      name: "Starter",
      price: "$149",
      period: "/month",
      description: "For growing brands getting started with AI search intelligence.",
      features: [
        "1 brand profile",
        "3 AI platform monitoring",
        "Weekly visibility reports",
        "Basic perception audit",
        "Email support",
      ],
      highlighted: false,
    },
    {
      name: "Professional",
      price: "$399",
      period: "/month",
      description: "For teams serious about dominating AI search visibility.",
      features: [
        "3 brand profiles",
        "All AI platform monitoring",
        "Daily visibility reports",
        "Advanced perception audits",
        "Competitive intelligence",
        "Opportunity discovery",
        "Priority support",
      ],
      highlighted: true,
      badge: "Most Popular",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For organizations needing full-scale AI search intelligence.",
      features: [
        "Unlimited brand profiles",
        "All AI platform monitoring",
        "Real-time visibility tracking",
        "Full perception audit suite",
        "Advanced competitive intel",
        "Custom integrations",
        "Dedicated success manager",
        "SLA guarantee",
      ],
      highlighted: false,
    },
  ];

  const faqItems: FaqItem[] = [
    {
      question: "What is AI Search Intelligence?",
      answer:
        "AI Search Intelligence is a new category of brand strategy focused on understanding and improving how your brand appears in AI-powered search experiences like ChatGPT, Perplexity, Google AI Overviews, and other generative AI platforms.",
    },
    {
      question: "How is this different from traditional SEO?",
      answer:
        "Traditional SEO focuses on ranking in organic search results with links. AI Search Intelligence focuses on how AI models understand, perceive, and recommend your brand in conversational AI responses — a fundamentally different challenge requiring new strategies.",
    },
    {
      question: "Which AI platforms do you monitor?",
      answer:
        "We monitor all major AI search platforms including ChatGPT, Perplexity, Google Gemini, Claude, Microsoft Copilot, and emerging AI search experiences. Our coverage expands as new platforms gain adoption.",
    },
    {
      question: "How quickly can I see results?",
      answer:
        "You will receive your first brand perception audit within 24 hours of setup. Ongoing visibility tracking begins immediately, and most brands see actionable insights within the first week.",
    },
    {
      question: "Can I track competitors?",
      answer:
        "Yes. Our Professional and Enterprise plans include competitive intelligence features that let you benchmark your AI search visibility against competitors and identify strategic opportunities.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                <Search className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Luminr
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </a>
              <a href="#faq" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                FAQ
              </a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <a href="/login">
                <Button variant="ghost" className="text-sm">
                  Sign In
                </Button>
              </a>
              <a href="/register">
                <Button className="text-sm bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white">
                  Get Started
                </Button>
              </a>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-3">
            <a href="#features" className="block text-sm text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="#how-it-works" className="block text-sm text-gray-600 hover:text-gray-900">
              How It Works
            </a>
            <a href="#pricing" className="block text-sm text-gray-600 hover:text-gray-900">
              Pricing
            </a>
            <a href="#faq" className="block text-sm text-gray-600 hover:text-gray-900">
              FAQ
            </a>
            <Separator />
            <div className="flex flex-col gap-2 pt-2">
              <a href="/login">
                <Button variant="outline" className="w-full text-sm">
                  Sign In
                </Button>
              </a>
              <a href="/register">
                <Button className="w-full text-sm bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
                  Get Started
                </Button>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            The Future of Brand Visibility
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Search Intelligence
            </span>
            <br />
            <span className="text-gray-900">for Modern Brands</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed">
            The strategic OS that helps businesses understand and grow their visibility across AI-powered search
            experiences. From brand perception audits to opportunity discovery.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/register">
              <Button
                size="lg"
                className="text-base px-8 py-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href="#how-it-works">
              <Button variant="outline" size="lg" className="text-base px-8 py-6">
                See How It Works
              </Button>
            </a>
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <div className="relative rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-8 shadow-2xl shadow-violet-500/5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-violet-600">12+</div>
                  <div className="text-sm text-gray-500 mt-1">AI Platforms Monitored</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-violet-600">500K+</div>
                  <div className="text-sm text-gray-500 mt-1">Queries Analyzed Daily</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-violet-600">98%</div>
                  <div className="text-sm text-gray-500 mt-1">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm">
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need for AI search visibility
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive platform built specifically for understanding and growing your brand presence in
              AI-powered search experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-gray-200 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300"
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-violet-50 flex items-center justify-center mb-3">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm">
              How It Works
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              From setup to insights in minutes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started quickly and begin understanding your AI search visibility with our streamlined workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <span className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-2">
                    Step {step.number}
                  </span>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full">
                    <div className="h-px w-3/4 bg-gradient-to-r from-violet-200 to-transparent mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm">
              Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Plans that scale with your brand
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start small and scale as your AI search strategy matures. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${
                  plan.highlighted
                    ? "border-violet-300 shadow-xl shadow-violet-500/10 scale-105"
                    : "border-gray-200"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-3 py-0.5">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="pt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-violet-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <a href="/register" className="w-full">
                    <Button
                      className={`w-full ${
                        plan.highlighted
                          ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
                          : ""
                      }`}
                      variant={plan.highlighted ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm">
              FAQ
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently asked questions</h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about Luminr and AI Search Intelligence.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 p-12 sm:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)]" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to own your AI search presence?
              </h2>
              <p className="text-lg text-violet-100 mb-8 max-w-2xl mx-auto">
                Join forward-thinking brands already using Luminr to understand and grow their visibility in
                AI-powered search experiences.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/register">
                  <Button
                    size="lg"
                    className="text-base px-8 py-6 bg-white text-violet-700 hover:bg-gray-100 shadow-lg"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base px-8 py-6 border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    Sign In
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                <Search className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Luminr
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#features" className="hover:text-gray-900 transition-colors">
                Features
              </a>
              <a href="#pricing" className="hover:text-gray-900 transition-colors">
                Pricing
              </a>
              <a href="#faq" className="hover:text-gray-900 transition-colors">
                FAQ
              </a>
              <a href="/login" className="hover:text-gray-900 transition-colors">
                Sign In
              </a>
            </div>

            <p className="text-sm text-gray-400">
              {"© 2024 Luminr. All rights reserved."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}