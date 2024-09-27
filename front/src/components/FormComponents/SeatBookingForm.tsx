import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { bookSeats } from '../../api/bookingApi';
import { FaCreditCard, FaPaypal, FaExclamationCircle } from 'react-icons/fa';
import { Movie } from '../../types/models';
import { useAuth } from '../../hooks/useAuth';

interface SeatBookingFormProps {
  seats: number[];
  totalAmount: number;
  showtimeId: string;
  movie: Movie | null;
}

const SeatBookingForm: React.FC<SeatBookingFormProps> = ({ seats, totalAmount, showtimeId, movie }) => {
  const { token } = useAuth();
  const [isBookingSuccessful, setIsBookingSuccessful] = useState(false);

  const validationSchema = Yup.object({
    paymentMethod: Yup.string().required('Payment method is required'),
  });

  const handleSubmit = async (values: { paymentMethod: string }) => {
    const movieId = movie?.id;
    console.log(movie);
    const bookingData = {
      seats,
      totalAmount,
      showtimeId,
      movieId
    };
    try {
      await bookSeats(bookingData, token).then(()=>setIsBookingSuccessful(true));
       
    } catch (error) {
      console.error('Booking failed:', error);
     
    }
  };


  if (isBookingSuccessful) {
    return (
      <div className="booking-success bg-green-100 p-6 rounded-lg max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold text-green-600">Booking Successful!</h2>
        <p className="text-lg mt-4 text-gray-800">
          Your seats have been booked successfully for the movie <strong>{movie?.name}</strong>.
        </p>
        <p className="text-lg mt-2">Enjoy the show!</p>
      </div>
    );
  }

  return (
    <Formik
      initialValues={{ paymentMethod: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="seat-booking-form bg-white p-6 rounded-lg max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Payment Details</h2>

          <div className="mb-4">
            <label htmlFor="paymentMethod" className="block text-lg font-medium mb-2">Select Payment Method</label>
            <div className="relative">
              <Field name="paymentMethod" as="select" className={`w-full p-3 border rounded ${errors.paymentMethod && touched.paymentMethod ? 'border-red-500' : 'border-gray-300'} transition duration-300`}>
                <option value="">-- Choose a Payment Method --</option>
                <option value="creditCard">
                  <FaCreditCard className="inline mr-2" /> Credit Card
                </option>
                <option value="paypal">
                  <FaPaypal className="inline mr-2" /> PayPal
                </option>
              </Field>
              <ErrorMessage name="paymentMethod">
                {(msg) => (
                  <div className="text-red-500 text-sm mt-1 flex items-center">
                    <FaExclamationCircle className="mr-1" /> {msg}
                  </div>
                )}
              </ErrorMessage>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-600 transition duration-300 ease-in-out"
            >
              Confirm Booking (${totalAmount})
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SeatBookingForm;
