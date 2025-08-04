import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Building, 
  DollarSign, 
  Target,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addWaitlistEntry } from '../utils/storage';

const WaitlistForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    interestType: '',
    investmentAmount: '',
    loanAmount: '',
    additionalInfo: '',
    agreeToTerms: false,
    marketingConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save to storage using the utility function
      const savedEntry = addWaitlistEntry(formData);
      console.log('Waitlist entry saved:', savedEntry);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      // You could add error handling UI here
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md border border-gray-800">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Welcome to PLEDG!</h2>
            <p className="text-gray-400 mb-6">
              Thank you for joining our exclusive waitlist. We'll notify you as soon as we launch and you'll get early access to India's most sophisticated P2P lending platform.
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md border border-gray-800">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">PLEDG</span>
            </div>
            <div className="w-16"></div>
          </div>
          <CardTitle className="text-3xl font-bold text-white mb-2">
            Join the Waitlist
          </CardTitle>
          <p className="text-gray-400">
            Be among the first to experience the future of secured lending
          </p>
        </CardHeader>
        
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-300">First Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-300">Last Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-gray-300">Company/Organization</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                    placeholder="Your company name"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-300">Role/Position</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                    placeholder="e.g., CEO, Investor, etc."
                  />
                </div>
              </div>
            </div>

            {/* Interest Type */}
            <div className="space-y-2">
              <Label htmlFor="interestType" className="text-gray-300">I'm interested in *</Label>
              <Select value={formData.interestType} onValueChange={(value) => handleInputChange('interestType', value)}>
                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white focus:border-blue-500">
                  <SelectValue placeholder="Select your interest" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="borrower" className="text-white hover:bg-gray-700">Borrowing (I need a loan)</SelectItem>
                  <SelectItem value="lender" className="text-white hover:bg-gray-700">Lending (I want to invest)</SelectItem>
                  <SelectItem value="both" className="text-white hover:bg-gray-700">Both (Borrowing and Lending)</SelectItem>
                  <SelectItem value="exploring" className="text-white hover:bg-gray-700">Just exploring the platform</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amount Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="investmentAmount" className="text-gray-300">Investment Amount (if lending)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <Select value={formData.investmentAmount} onValueChange={(value) => handleInputChange('investmentAmount', value)}>
                    <SelectTrigger className="pl-10 bg-gray-800/50 border-gray-700 text-white focus:border-blue-500">
                      <SelectValue placeholder="Select amount range" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="10k-50k" className="text-white hover:bg-gray-700">₹10K-50K</SelectItem>
                      <SelectItem value="50k-1lakh" className="text-white hover:bg-gray-700">₹50K-1 Lakh</SelectItem>
                      <SelectItem value="1-5lakh" className="text-white hover:bg-gray-700">₹1-5 Lakh</SelectItem>
                      <SelectItem value="5-10lakh" className="text-white hover:bg-gray-700">₹5-10 Lakh</SelectItem>
                      <SelectItem value="10-25lakh" className="text-white hover:bg-gray-700">₹10-25 Lakh</SelectItem>
                      <SelectItem value="25-50lakh" className="text-white hover:bg-gray-700">₹25-50 Lakh</SelectItem>
                      <SelectItem value="50lakh+" className="text-white hover:bg-gray-700">₹50 Lakh+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="loanAmount" className="text-gray-300">Loan Amount (if borrowing)</Label>
                <div className="relative">
                  <Target className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <Select value={formData.loanAmount} onValueChange={(value) => handleInputChange('loanAmount', value)}>
                    <SelectTrigger className="pl-10 bg-gray-800/50 border-gray-700 text-white focus:border-blue-500">
                      <SelectValue placeholder="Select amount range" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="10k-50k" className="text-white hover:bg-gray-700">₹10K-50K</SelectItem>
                      <SelectItem value="50k-1lakh" className="text-white hover:bg-gray-700">₹50K-1 Lakh</SelectItem>
                      <SelectItem value="1-5lakh" className="text-white hover:bg-gray-700">₹1-5 Lakh</SelectItem>
                      <SelectItem value="5-10lakh" className="text-white hover:bg-gray-700">₹5-10 Lakh</SelectItem>
                      <SelectItem value="10-25lakh" className="text-white hover:bg-gray-700">₹10-25 Lakh</SelectItem>
                      <SelectItem value="25-50lakh" className="text-white hover:bg-gray-700">₹25-50 Lakh</SelectItem>
                      <SelectItem value="50lakh+" className="text-white hover:bg-gray-700">₹50 Lakh+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-2">
              <Label htmlFor="additionalInfo" className="text-gray-300">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                placeholder="Tell us more about your requirements, questions, or any specific needs..."
                rows={3}
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                  className="border-gray-600 data-[state=checked]:bg-blue-500"
                />
                <Label htmlFor="agreeToTerms" className="text-sm text-gray-300">
                  I agree to the <a href="#" className="text-blue-400 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a> *
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marketingConsent"
                  checked={formData.marketingConsent}
                  onCheckedChange={(checked) => handleInputChange('marketingConsent', checked)}
                  className="border-gray-600 data-[state=checked]:bg-blue-500"
                />
                <Label htmlFor="marketingConsent" className="text-sm text-gray-300">
                  I would like to receive updates about PLEDG's launch and early access opportunities
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !formData.agreeToTerms}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Joining Waitlist...
                </>
              ) : (
                'Join Waitlist'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitlistForm; 