import React, { useState, useRef } from 'react';
import { Card } from './Card.tsx';
import { Input } from './Input.tsx';
import { Button } from './Button.tsx';
import { submitReferral } from './api.ts';
import { UserIcon } from './UserIcon.tsx';
import { CalendarIcon } from './CalendarIcon.tsx';

/**
 * A form that allows users to recommend a new contact. This component uses
 * explicit state management instead of the experimental `useActionState`
 * and `useFormStatus` hooks to ensure compatibility across React versions.
 * Backend requests are protected by Firebase App Check with an invisible reCAPTCHA v3.
 */
export const ReferralForm = () => {
  // Form fields
  const [recommendedName, setRecommendedName] = useState('');
  const [referrerName, setReferrerName] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // ref to reset form after submission
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    // Validate required fields
    if (!recommendedName) {
      setError('Bitte geben Sie den Namen des Kontakts an, den Sie empfehlen möchten.');
      return;
    }

    setLoading(true);
    try {
      await submitReferral({ recommendedName, referrerName, preferredDate });
      setIsSuccess(true);
      // reset form fields
      formRef.current?.reset();
      setRecommendedName('');
      setReferrerName('');
      setPreferredDate('');
    } catch (err) {
      console.error(err);
      setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    } finally {
      setLoading(false);
    }
  };

  // Render success message if form was submitted successfully
  if (isSuccess) {
    return (
      <Card className="text-center animate-fade-in-up">
        <div className="p-4 rounded-lg">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-500/20">
              <svg
                className="h-6 w-6 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-slate-800">Empfehlung erfolgreich!</h3>
              <div className="mt-2">
                <p className="text-sm text-slate-600">
                  Vielen Dank! Ihre Empfehlung wurde erfolgreich übermittelt.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="secondary" onClick={() => setIsSuccess(false)}>
              Weitere Empfehlung absenden
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 font-montserrat">
          Empfehlen Sie mich weiter!
        </h2>
        <p className="text-slate-600 mt-2">
          Kennen Sie jemanden, der von einer professionellen Vermögensberatung profitieren könnte?
        </p>
      </div>
      <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
        <Input
          id="recommendedName"
          name="recommendedName"
          label="Name des Kontakts *"
          required
          placeholder="Max Mustermann"
          onChange={(e) => setRecommendedName((e.target as HTMLInputElement).value)}
          icon={<UserIcon className="h-5 w-5 text-slate-500" />}
        />
        <Input
          id="referrerName"
          name="referrerName"
          label="Ihr Name (Optional, für Belohnung)"
          placeholder="Anna Schmidt"
          onChange={(e) => setReferrerName((e.target as HTMLInputElement).value)}
          icon={<UserIcon className="h-5 w-5 text-slate-500" />}
        />
        <Input
          id="preferredDate"
          name="preferredDate"
          label="Bevorzugter Termin (Optional)"
          type="date"
          onChange={(e) => setPreferredDate((e.target as HTMLInputElement).value)}
          icon={<CalendarIcon className="h-5 w-5 text-slate-500" />}
        />

        {error && (
          <p className="text-red-500 text-sm text-center font-medium">
            {error}
          </p>
        )}

        <Button type="submit" variant="accent" className="w-full" disabled={loading}>
          {loading ? 'Wird gesendet...' : 'Empfehlung absenden'}
        </Button>
      </form>
    </Card>
  );
};
