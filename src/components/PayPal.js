import React, { useState, useRef, useEffect, memo } from "react";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { splitDate } from '../ultils/splitDateTime';
import emailjs from '@emailjs/browser';
import { orderAdd } from "../store/actions";
import { useDispatch, useSelector } from 'react-redux'

const Paypal = ({payload, tour}) => {
  const paypal = useRef();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { msg_order, order_data, update } = useSelector(state => state.order)
  useEffect(() => {
      if (msg_order !== '' && order_data) {
        if (msg_order === 'success') {
          Swal.fire({
            title: "Thanh toán thành công",
            icon: "success",
            confirmButtonText: "Tiếp tục"
          }).then((result) => {
            if (result.isConfirmed) {
              console.log('order: ', order_data)
                // Your EmailJS service ID, template ID, and Public Key
                const serviceId = 'service_xkshgih';
                const templateId = 'template_ook7ttp';
                const publicKey = 'GMnxCkJbnTJAFDDgP';
                // Create a new object that contains dynamic template params
                const templateParams = {
                    payment: 'Thanh toán qua PayPal',
                    from_email: payload.email,
                    from_name: 'Kb Du Lịch',
                    to_name: payload.username,
                    message: payload.note,
                    phone_num: payload.phone,
                    tour_name: tour.name,
                    tour_days: tour.day_num + ' ngày ' + tour.night_num + ' đêm',
                    tour_order_id: order_data.order_ID, // data
                    start_date: splitDate(tour.starting_date)[0] + '/' + splitDate(tour.starting_date)[1] + '/' + splitDate(tour.starting_date)[2],
                    num_passenger: payload.ticket_num,
                    amount_money: Number(tour.price*payload.ticket_num).toLocaleString() + ' VND',
                };
                // Send the email using EmailJS
                // emailjs.send(serviceId, templateId, templateParams, publicKey)
                //     .then((response) => {
                //         console.log('Email sent successfully!', response);
                //     })
                //     .catch((error) => {
                //         console.error('Error sending email:', error);
                //     });
                navigate('/tour-booking3/'+ tour.tour_ID, { state: { 
                  ...order_data, 
                  total_bill: tour.price*payload.ticket_num 
                }})
            }
          })
        }
        else Swal.fire('Oops !', msg_order, 'error')
      }
  }, [msg_order, update])
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table",
                amount: {
                  currency_code: "USD",
                  value: 0.01,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
            return actions.order.capture().then(function (details) {
                const new_payload = {
                  ...payload,
                    pay_method: 'PayPal'
                }
                dispatch(orderAdd(new_payload))
            });
        },
        onError: (err) => {
          console.log(err);
        },
      })
    .render(paypal.current);
  }, [navigate]);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
export default memo(Paypal)