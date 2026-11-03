/**
 * ContactForm Component
 * Fully functional contact form with Zod validation, React Hook Form, URL query param
 * service/topic pre-selection (?service=...&topic=...), and Nepal-localized placeholders.
 * Submits via ContactAPI.submit.
 */

import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/utils/cn';
import { Input } from '@/components/Input/Input';
import { TextArea } from '@/components/TextArea/TextArea';
import { Button } from '@/components/Button/Button';
import { AppIcon } from '@/components/AppIcon/AppIcon';
import { ContactAPI } from '@/api/contact';

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name is required (min 2 characters)'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  organization: z.string().min(2, 'Organization or client name is required'),
  organizationType: z.enum(['cooperative', 'sme', 'ngo', 'government', 'other'] as const, {
    message: 'Please select an organization type',
  }),
  service: z.enum(
    ['financial-consulting', 'accounting', 'audit', 'tax', 'cooperative', 'training', 'general'] as const,
    {
      message: 'Please select a service area',
    }
  ),
  message: z.string().min(10, 'Please provide a brief message (min 10 characters)'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

/** Map URL ?service= category/pillar IDs to valid ContactForm service enum values */
function mapServiceQueryParam(raw: string | null): ContactFormValues['service'] {
  if (!raw) return 'general';
  const normalized = raw.toLowerCase().trim();
  if (
    normalized === 'financial-consulting' ||
    normalized === 'retirement-planning' ||
    normalized.includes('retirement') ||
    normalized.includes('financial')
  ) {
    return 'financial-consulting';
  }
  if (normalized === 'cooperative' || normalized === 'advisory') {
    return 'cooperative';
  }
  if (normalized === 'accounting') return 'accounting';
  if (normalized === 'audit') return 'audit';
  if (normalized === 'tax') return 'tax';
  if (normalized === 'training') return 'training';
  return 'general';
}

export function ContactForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      organizationType: 'cooperative',
      service: 'general',
    },
  });

  // Pre-fill service & topic from URL query parameters (?service=...&topic=...)
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const topicParam = searchParams.get('topic');

    if (serviceParam) {
      setValue('service', mapServiceQueryParam(serviceParam));
    }
    if (topicParam) {
      setSelectedTopic(topicParam);
      const currentMsg = getValues('message');
      if (!currentMsg) {
        setValue(
          'message',
          `I would like to request a consultation regarding "${topicParam}". Please let us know available times to discuss scope and requirements.`
        );
      }
    }
  }, [searchParams, setValue, getValues]);

  const handleClearTopic = () => {
    setSelectedTopic(null);
    if (searchParams.has('topic') || searchParams.has('service')) {
      const next = new URLSearchParams(searchParams);
      next.delete('topic');
      next.delete('service');
      setSearchParams(next, { replace: true });
    }
  };

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitStatus('idle');
    try {
      const response = await ContactAPI.submit(data);
      setReferenceId(response.data.referenceId);
      setSubmitStatus('success');
      reset();
    } catch {
      setSubmitStatus('error');
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="flex flex-col items-center text-center py-6 gap-4">
        <AppIcon name="CheckCircle" size={40} weight="duotone" className="text-brick-600" />
        <div>
          <h3 className="font-display font-semibold text-2xl text-navy-700">
            Thank you for reaching out
          </h3>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-md">
            Your inquiry has been received. Our team will review your details and contact you within one business day.
          </p>
        </div>
        {referenceId && (
          <p className="font-mono text-sm text-slate-700">
            Reference ID: {referenceId}
          </p>
        )}
        <Button
          variant="outline"
          className="mt-2"
          onClick={() => setSubmitStatus('idle')}
        >
          Send another inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      {/* Pre-selected Service Topic Context Line */}
      {selectedTopic && (
        <div className="flex items-start justify-between gap-3 border-l-2 border-brick-600 pl-3 text-sm text-slate-700">
          <p className="py-2.5">
            Regarding: <strong className="font-semibold text-slate-900">{selectedTopic}</strong>
          </p>
          <button
            type="button"
            onClick={handleClearTopic}
            aria-label="Remove topic"
            className="size-11 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shrink-0"
          >
            <AppIcon name="X" size={16} weight="bold" />
          </button>
        </div>
      )}

      {/* Error Banner */}
      {submitStatus === 'error' && (
        <div className="border-l-2 border-red-600 pl-3 text-sm text-red-700" role="alert">
          We encountered an error while submitting your inquiry. Please try again or contact our Kathmandu office directly.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          id="firstName"
          label="First name"
          required
          placeholder="e.g. Aarav"
          error={errors.firstName?.message}
          {...register('firstName')}
        />
        <Input
          id="lastName"
          label="Last name"
          required
          placeholder="e.g. Sharma"
          error={errors.lastName?.message}
          {...register('lastName')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          id="email"
          type="email"
          label="Email address"
          required
          placeholder="name@example.com.np"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          id="phone"
          type="tel"
          label="Phone number"
          placeholder="e.g. +977 985-109-3898"
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          id="organization"
          label="Organization name"
          required
          placeholder="e.g. Kathmandu Savings & Credit Co-op"
          error={errors.organization?.message}
          {...register('organization')}
        />

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="organizationType"
            className="text-sm font-medium text-slate-700"
          >
            Organization type <span className="text-red-600 ml-1" aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <select
              id="organizationType"
              className={cn(
                'w-full min-h-[44px] pl-4 pr-10 py-2.5 text-sm appearance-none',
                'border rounded bg-white text-slate-800',
                'focus:outline-none focus:ring-2 focus:ring-brick-600 focus:border-brick-600',
                errors.organizationType ? 'border-red-500' : 'border-slate-300 hover:border-slate-400'
              )}
              {...register('organizationType')}
            >
              <option value="cooperative">Cooperative</option>
              <option value="sme">Small/Medium Enterprise (SME)</option>
              <option value="ngo">NGO / Foundation</option>
              <option value="government">Government Agency</option>
              <option value="other">Other</option>
            </select>
            <AppIcon
              name="CaretDown"
              size={16}
              weight="bold"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>
          {errors.organizationType && (
            <p className="text-sm text-red-600" role="alert">{errors.organizationType.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="service"
          className="text-sm font-medium text-slate-700"
        >
          Area of interest <span className="text-red-600 ml-1" aria-hidden="true">*</span>
        </label>
        <div className="relative">
          <select
            id="service"
            className={cn(
              'w-full min-h-[44px] pl-4 pr-10 py-2.5 text-sm appearance-none',
              'border rounded bg-white text-slate-800',
              'focus:outline-none focus:ring-2 focus:ring-brick-600 focus:border-brick-600',
              errors.service ? 'border-red-500' : 'border-slate-300 hover:border-slate-400'
            )}
            {...register('service')}
          >
            <option value="financial-consulting">Financial Consulting & Planning</option>
            <option value="accounting">Accounting & Bookkeeping Services</option>
            <option value="audit">Audit Preparation & Internal Audit</option>
            <option value="tax">Tax Consulting & Compliance</option>
            <option value="cooperative">Cooperative Formation & Advisory</option>
            <option value="training">Training Programs</option>
            <option value="general">General Inquiry (including real estate)</option>
          </select>
          <AppIcon
            name="CaretDown"
            size={16}
            weight="bold"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
          />
        </div>
        {errors.service && (
          <p className="text-sm text-red-600" role="alert">{errors.service.message}</p>
        )}
      </div>

      <TextArea
        id="message"
        label="How can we help you?"
        required
        rows={4}
        placeholder="Briefly describe your requirements or goals..."
        error={errors.message?.message}
        {...register('message')}
      />

      <div className="pt-2 flex flex-col items-start gap-3">
        <Button type="submit" size="lg" isLoading={isSubmitting}>
          Send inquiry
        </Button>
        <p className="text-sm text-slate-500">
          Your information is kept confidential. See our{' '}
          <Link to="/privacy" className="underline hover:text-brick-600">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
