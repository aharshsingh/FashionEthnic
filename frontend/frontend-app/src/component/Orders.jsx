import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Package, MapPin, CalendarDays, Truck } from 'lucide-react'
import Ordersnippet from './OrderSnippet'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'

export default function Orders() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = user?._id;

  useEffect(() => {
    if (!userId) {
      setOrders([]);
      setLoading(false);
      return;
    }
    const getOrder = async () => {
      try {
        const response = await axios.get(
          `https://fashionethnic.onrender.com/api/orders/get_order/${userId}`
        );
        setOrders(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getOrder();
  }, [userId]);

  const fmtDate = (d) => {
    if (!d) return '';
    try {
      return new Date(d).toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="animate-fade-up">
      <div className="border-b border-navy/10 pb-5">
        <h2 className="font-display text-2xl font-bold text-navy">Order History</h2>
        <p className="mt-1 text-sm text-navy/50">Track and review your past orders.</p>
      </div>

      {loading ? (
        <div className="mt-6 space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-navy/5 p-5">
              <div className="skeleton h-5 w-40 rounded-full" />
              <div className="skeleton mt-4 h-16 w-full rounded-xl" />
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-2xl border border-navy/5 bg-cream/40 px-6 py-14 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-coral/10 text-coral">
            <Package className="h-7 w-7" />
          </span>
          <h3 className="mt-5 font-display text-xl font-bold text-navy">No orders yet</h3>
          <p className="mt-2 max-w-sm text-sm text-navy/60">
            When you place an order, it'll show up here so you can track it.
          </p>
          <Link to="/products" className="btn-primary mt-7">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          {orders.map((o, idx) => (
            <div key={idx} className="overflow-hidden rounded-2xl border border-navy/5 shadow-soft">
              {/* Order header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/5 bg-cream/50 px-5 py-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-coral/10 px-3 py-1.5 text-xs font-bold text-coral">
                  <Truck className="h-3.5 w-3.5" /> {o.status || 'Delivery in process'}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm text-navy/50">
                  <CalendarDays className="h-4 w-4" /> {fmtDate(o.orderDate)}
                </span>
              </div>

              {/* Body */}
              <div className="p-5">
                <p className="mb-4 flex items-start gap-1.5 text-sm text-navy/60">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                  <span>Delivery address: <span className="text-navy/80">{o.address || 'N/A'}</span></span>
                </p>
                <div className="space-y-3">
                  {(o.items || []).map((item, i) => (
                    <Ordersnippet key={item._id || i} order={item} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
