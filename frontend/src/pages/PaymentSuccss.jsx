
import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

function PaymentSuccess() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');

  const { backendUrl, token } = useContext(AppContext);

  const [state, setState] = useState({
    loading: true,
    ok: false,
    message: '',
    amount: 0,
    currency: 'CAD',
    appointmentId: '',
  });

  useEffect(() => {
    const verify = async () => {
      try {
        const headers = token ? { token } : {};

        const { data } = await axios.get(
          `${backendUrl}/api/user/verify-stripe-payment`,
          { params: { session_id: sessionId }, headers }
        );

        if (data.success) {
          toast.success('Payment verified successfully!');
          setState({
            loading: false,
            ok: true,
            message: 'Payment verified successfully!',
            amount: data.amount ?? 0,
            currency: (data.currency || 'cad').toUpperCase(),
            appointmentId: data.appointmentId || '',
          });
        } else {
          toast.error(data.message || 'Payment not verified.');
          setState({
            loading: false,
            ok: false,
            message: data.message || 'Payment not completed',
            amount: 0,
            currency: 'CAD',
            appointmentId: '',
          });
        }
      } catch (err) {
        toast.error('Not Authorized Login Again');
        setState({
          loading: false,
          ok: false,
          message: 'Not Authorized Login Again',
          amount: 0,
          currency: 'CAD',
          appointmentId: '',
        });
      }
    };

    if (sessionId) verify();
    else {
      setState(s => ({ ...s, loading: false, ok: false, message: 'Missing session_id' }));
    }
  }, [sessionId, backendUrl, token]);

  return (
    <div className="min-h-[60vh] flex items-start justify-center">
      <div className="w-full max-w-2xl mx-4 mt-10 bg-white border rounded-2xl shadow-sm">
        <div className="p-6 sm:p-8">
          {state.loading ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-zinc-700">Verifying payment…</h2>
            </div>
          ) : state.ok ? (
            <>
              <h2 className="text-xl font-semibold text-green-600 mb-2">✅ Payment Successful</h2>

              <div className="space-y-2 text-sm text-zinc-700">
                <p>
                  <span className="font-medium text-neutral-800">Session ID:</span>{' '}
                  <code className="bg-zinc-50 border px-2 py-1 rounded">{sessionId}</code>
                </p>

                {state.appointmentId && (
                  <p>
                    <span className="font-medium text-neutral-800">Appointment ID:</span>{' '}
                    <code className="bg-zinc-50 border px-2 py-1 rounded">{state.appointmentId}</code>
                  </p>
                )}

                <p>
                  <span className="font-medium text-neutral-800">Amount:</span>{' '}
                  {(state.amount / 100).toFixed(2)} {state.currency}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={() => navigate('/my-appointments')}
                  className="text-sm text-stone-500 sm:min-w-48 py-2 px-4 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Back to My Appointments
                </button>
                <Link
                  to="/"
                  className="text-sm text-stone-500 sm:min-w-48 py-2 px-4 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Home
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-red-600 mb-2">❌ Payment Failed</h2>
              <p className="text-sm text-zinc-700">{state.message}</p>

              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={() => navigate('/my-appointments')}
                  className="text-sm text-stone-500 sm:min-w-48 py-2 px-4 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Back to My Appointments
                </button>
                <Link
                  to="/"
                  className="text-sm text-stone-500 sm:min-w-48 py-2 px-4 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Home
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;

