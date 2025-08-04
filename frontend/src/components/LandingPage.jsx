import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  TrendingUp, 
  Clock, 
  Users, 
  Lock, 
  CheckCircle2, 
  ArrowRight,
  Banknote,
  PieChart,
  Zap,
  Globe,
  Calculator,
  ChevronDown,
  ChevronUp,
  Star,
  Award,
  Smartphone,
  BarChart3,
  Eye,
  EyeOff
} from 'lucide-react';

const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isVisible, end, duration]);

  return (
    <span ref={counterRef} className="font-bold">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const LoanCalculator = () => {
  const [amount, setAmount] = useState(100000);
  const [tenure, setTenure] = useState(12);
  const [rate, setRate] = useState(12); // Dynamic interest rate

  const monthlyEmi = (amount * (rate/100/12) * Math.pow(1 + rate/100/12, tenure)) / 
                     (Math.pow(1 + rate/100/12, tenure) - 1);

  return (
    <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md border border-gray-800 rounded-2xl p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="w-8 h-8 text-blue-400" />
        <h3 className="text-2xl font-bold text-white">Loan Calculator</h3>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Loan Amount</label>
          <div className="relative">
            <input
              type="range"
              min="10000"
              max="5000000"
              step="10000"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>₹10K</span>
              <span>₹50L</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mt-2">₹{amount.toLocaleString()}</div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Tenure (Months)</label>
          <div className="relative">
            <input
              type="range"
              min="6"
              max="60"
              step="6"
              value={tenure}
              onChange={(e) => setTenure(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>6M</span>
              <span>60M</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mt-2">{tenure} months</div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Interest Rate (% per annum)</label>
          <div className="relative">
            <input
              type="range"
              min="8"
              max="18"
              step="0.5"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>8%</span>
              <span>18%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mt-2">{rate}% per annum</div>
        </div>

        <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Monthly EMI</p>
            <p className="text-3xl font-bold text-white">₹{Math.round(monthlyEmi).toLocaleString()}</p>
            <p className="text-gray-400 text-sm mt-2">@ {rate}% per annum</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border border-gray-800 rounded-lg overflow-hidden hover:border-gray-600 transition-all duration-300">
    <button
      onClick={onClick}
      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-900/50 transition-colors"
    >
      <span className="font-semibold text-white pr-4">{question}</span>
      {isOpen ? (
        <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
      )}
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
      <div className="p-6 pt-0 text-gray-400 leading-relaxed">
        {answer}
      </div>
    </div>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [userType, setUserType] = useState('borrower'); // borrower or lender
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Secured by Assets",
      description: "Your mutual funds act as collateral, ensuring lenders get peace of mind while you access liquidity.",
      gradient: "from-green-500/20 to-emerald-600/20",
      iconColor: "text-green-400"
    },
    {
      icon: TrendingUp,
      title: "Fair Market Rates",
      description: "Competitive interest rates determined by market dynamics, not arbitrary bank policies.",
      gradient: "from-blue-500/20 to-cyan-600/20",
      iconColor: "text-blue-400"
    },
    {
      icon: Clock,
      title: "Quick Processing",
      description: "Digital-first approach means faster approvals and instant fund transfers.",
      gradient: "from-purple-500/20 to-violet-600/20",
      iconColor: "text-purple-400"
    },
    {
      icon: Users,
      title: "P2P Marketplace",
      description: "Direct connection between borrowers and lenders, cutting out traditional middlemen.",
      gradient: "from-orange-500/20 to-red-600/20",
      iconColor: "text-orange-400"
    }
  ];

  const borrowerBenefits = [
    "Unlock liquidity without selling investments",
    "Retain ownership of your mutual funds",
    "Competitive interest rates starting at 10%",
    "Quick digital onboarding in 15 minutes",
    "Flexible repayment options (EMI/Bullet)",
    "No hidden fees or charges"
  ];

  const lenderBenefits = [
    "Secured lending with collateral backing",
    "Higher returns than traditional FDs (8-18%)",
    "Diversified lending portfolio",
    "Transparent risk assessment",
    "Automated collection process",
    "Real-time portfolio tracking"
  ];

  const steps = [
    {
      step: "01",
      title: "Connect Your Portfolio",
      description: "Link your mutual fund holdings through secure CAMS/KFintech integration with real-time valuation"
    },
    {
      step: "02", 
      title: "Get Verified",
      description: "Complete KYC with PAN, Aadhaar verification and AI-powered risk assessment in minutes"
    },
    {
      step: "03",
      title: "Create or Fund Loans",
      description: "Borrowers request loans with flexible terms, lenders review and fund opportunities instantly"
    },
    {
      step: "04",
      title: "Secure & Transact",
      description: "Automated lien marking, escrow fund management, and seamless repayments with SMS alerts"
    }
  ];

  const faqs = [
    // General Platform FAQs
    {
      question: "How does mutual fund collateral work?",
      answer: "Your mutual fund units are marked with a lien through CAMS/KFintech, meaning they remain in your demat account but cannot be sold until the loan is repaid. You continue to receive dividends and benefit from NAV appreciation."
    },
    {
      question: "What happens if I default on the loan?",
      answer: "In case of default, lenders can invoke the lien and sell the mutual fund units to recover their investment. The process is automated and transparent, ensuring fair treatment for all parties."
    },
    {
      question: "How are interest rates determined?",
      answer: "Interest rates are determined by market forces - lenders bid on loan requests, and borrowers choose the best offers. This ensures fair, competitive rates based on actual risk assessment and market demand."
    },
    {
      question: "What types of mutual funds are accepted?",
      answer: "We accept equity, debt, and hybrid mutual funds from all major AMCs in India. The loan-to-value ratio varies based on the fund category and historical volatility, typically ranging from 50-80% of the portfolio value."
    },
    {
      question: "Is PLEDG regulated?",
      answer: "Yes, we comply with SEBI/RBI guidelines for lending against securities and follow all applicable P2P lending regulations."
    },
    {
      question: "What fees does PLEDG charge?",
      answer: "We charge a small platform fee from both borrowers and lenders to cover operational costs. All charges are disclosed upfront."
    },
    {
      question: "Can NRIs use PLEDG?",
      answer: "Currently, PLEDG is available only for Indian residents with valid KYC. NRI support is planned in future phases."
    },
    {
      question: "How secure is my data?",
      answer: "We use 256-bit SSL encryption, comply with Indian data privacy laws, and never sell or share your data with third parties."
    },
    
    // Borrower FAQs
    {
      question: "Can I repay my loan early without penalties?",
      answer: "Yes, PLEDG allows early repayments without pre-closure charges. You only pay interest for the period you have used the loan."
    },
    {
      question: "Will I still get dividends or returns from my mutual funds while they are pledged?",
      answer: "Yes. You will continue to receive all dividends and benefit from NAV appreciation during the loan period."
    },
    {
      question: "Is there a minimum loan amount?",
      answer: "The minimum loan amount is ₹10,000. This ensures the process remains cost-effective for both borrowers and lenders."
    },
    {
      question: "What happens if my mutual fund value drops during the loan period?",
      answer: "If the value falls below a certain threshold, we may request additional collateral or partial repayment to maintain the agreed Loan-to-Value (LTV) ratio."
    },

    
    // Lender FAQs
    {
      question: "How is my investment protected?",
      answer: "Loans are backed by mutual fund units held under lien. In case of default, units are liquidated to recover the loan amount."
    },
    {
      question: "What returns can I expect?",
      answer: "Depending on borrower profiles and market demand, you can expect annualized returns between 8–18%."
    },
    {
      question: "Can I lend to multiple borrowers?",
      answer: "Yes. You can diversify your investment across multiple borrowers to spread risk."
    },


  ];

  const stats = [
    { number: 500, suffix: "+", label: "Waitlist Signups" },
    { number: 50, suffix: "Cr", label: "Target Loan Volume" },
    { number: 8, suffix: "-18%", label: "Expected Interest Rate" },
    { number: 15, suffix: "min", label: "Expected Approval Time" }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Enhanced Animated Background */}
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none transition-all duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.1) 50%, transparent 70%)`
        }}
      />
      
      {/* Header with Enhanced Interactivity */}
      <header className="relative z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Banknote className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight group-hover:text-blue-400 transition-colors">PLEDG</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-all duration-300 relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-all duration-300 relative group">
              How it Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#calculator" className="text-gray-300 hover:text-white transition-all duration-300 relative group">
              Calculator
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <Button variant="outline" className="border-gray-600 text-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300">
              Contact Us
            </Button>
          </nav>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="relative px-6 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-700 animate-pulse">
              Coming Soon - India's First P2P Mutual Fund Lending Platform
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent animate-fade-in">
                unlock liquidity
              </span>
              <br />
              <span className="text-gray-400">without selling your</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                mutual funds
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 mb-8 leading-relaxed max-w-3xl mx-auto">
              India's first P2P marketplace for secured loans backed by mutual fund holdings. 
              Join our waitlist to be among the first to experience fair rates for borrowers and safer investments for lenders.
            </p>

            {/* Interactive User Type Toggle */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full p-1 flex">
                <button
                  onClick={() => setUserType('borrower')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    userType === 'borrower' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  I need a loan
                </button>
                <button
                  onClick={() => setUserType('lender')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    userType === 'lender' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  I want to lend
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button 
                onClick={() => navigate('/waitlist')}
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg group transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {userType === 'borrower' ? 'Get Started as Borrower' : 'Become a Lender'}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className="py-16 px-6 border-y border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-gray-400">built for the</span>
              <br />
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">financially forward</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Leveraging technology to create a transparent, efficient, and secure lending ecosystem.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-gray-600 transition-all duration-500 group backdrop-blur-sm hover:scale-105 hover:shadow-2xl">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300`}>
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section id="calculator" className="py-20 px-6 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-gray-400">calculate your</span>
              <br />
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">loan potential</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See how much you can borrow against your mutual fund portfolio and plan your EMIs.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <LoanCalculator />
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section id="benefits" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Borrowers */}
            <div className="text-center lg:text-left group">
              <div className="inline-flex items-center space-x-2 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-600/20 rounded-lg">
                  <PieChart className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-3xl font-bold group-hover:text-blue-300 transition-colors">For Borrowers</h3>
              </div>
              <p className="text-xl text-gray-400 mb-8">
                Access instant liquidity against your mutual fund portfolio without losing ownership.
              </p>
              <ul className="space-y-4">
                {borrowerBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-300 group-hover:text-white transition-colors">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lenders */}
            <div className="text-center lg:text-left group">
              <div className="inline-flex items-center space-x-2 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-lg">
                  <Zap className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-3xl font-bold group-hover:text-purple-300 transition-colors">For Lenders</h3>
              </div>
              <p className="text-xl text-gray-400 mb-8">
                Invest in secured debt instruments with transparent risk profiles and higher yields.
              </p>
              <ul className="space-y-4">
                {lenderBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-300 group-hover:text-white transition-colors">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced How it Works */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-gray-400">simple.</span>
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"> secure.</span>
              <span className="text-gray-400"> seamless.</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Four simple steps to unlock the power of your mutual fund portfolio.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <Card className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all duration-500 backdrop-blur-sm hover:scale-105 hover:shadow-2xl">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold group-hover:scale-110 transition-transform duration-300 relative">
                      {step.step}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{step.description}</p>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-gray-600 group-hover:text-blue-400 transition-colors" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-gray-400">questions?</span>
              <br />
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">we have answers</span>
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to know about PLEDG's P2P lending platform.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Security Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-900/50 to-black/50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative group inline-block mb-6">
            <Lock className="w-16 h-16 text-blue-400 mx-auto group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-blue-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gray-400">your data isn't our business.</span>
            <br />
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">keeping it safe is.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Bank-grade security with end-to-end encryption. Your financial data is protected with 
            the highest industry standards, regulatory compliance, and zero data monetization.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Shield, label: "256-bit SSL Encryption" },
              { icon: Globe, label: "Regulatory Compliance" },
              { icon: Lock, label: "Zero Data Monetization" }
            ].map((item, index) => (
              <div key={index} className="text-center group cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:from-green-500/30 group-hover:to-emerald-600/30 transition-all duration-300">
                  <item.icon className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gray-400">not everyone</span>
            <br />
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">gets early access</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            Join the exclusive waitlist for India's most sophisticated P2P lending platform. 
            Be among the first to experience the future of secured lending.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              onClick={() => navigate('/waitlist')}
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg group transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Join Waitlist
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="border-t border-gray-800 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4 group cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Banknote className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold group-hover:text-blue-400 transition-colors">PLEDG</span>
              </div>
              <p className="text-gray-400 text-sm">
                Revolutionizing secured lending through mutual fund collateralization.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-blue-400">Product</h4>
              <ul className="space-y-2 text-sm">
                {["For Borrowers", "For Lenders", "How it Works", "Security"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform inline-block duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-purple-400">Company</h4>
              <ul className="space-y-2 text-sm">
                {["About Us", "Careers", "Contact", "Press"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform inline-block duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-green-400">Legal</h4>
              <ul className="space-y-2 text-sm">
                {["Privacy Policy", "Terms of Service", "Compliance"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform inline-block duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm mb-4">
              © 2025 PLEDG. All rights reserved. | Regulated by [Regulatory Body] | Made with ❤️ in India
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="text-gray-400 hover:text-white text-sm"
              >
                Admin Dashboard
              </Button>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;