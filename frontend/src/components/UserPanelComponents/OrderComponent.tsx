import React, { useEffect, useState } from "react";
import css from "./OrderComponent.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/appHooks";
import { UIActions } from "../../store/UI";
import { Link } from "react-router-dom";
import { AiOutlineArrowDown, AiOutlineArrowLeft } from "react-icons/ai";
function OrderComponent() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<IOrder[]>();
  const [loading, setLoading] = useState(false);
  const user = useAppSelector((state: RootState) => state.user);
  const [dataVisible, setDataVisible] = useState<number>(-1);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:9000/api/order?user=${user.userId}`
        );
        const resData = await response.json();
        setData(resData.data);
        setLoading(false);
      } catch (err) {
        dispatch(
          UIActions.showWarning({
            flag: "red",
            text: "Brak połączenia z serwerem",
          })
        );
      }
    })();
  }, []);
  if (!data) return <></>;
  return (
    <div className={css.ordersContainer}>
      {data.map((order, index) => (
        <>
          <div key={order._id} className={css.orderList}>
            <span className={css.orderListEl}>
              {order.orderNumber.split("-")[1]}
            </span>
            <span className={css.orderListEl}>
              {order.createdAt.slice(0, 16).split("T").join(" ")}
            </span>
            <span className={order.paid ? css.green : css.red}>
              {order.paid ? "Zapłacone" : "Niezapłacone"}
            </span>
            <span className={css.orderListEl}>
              {order.totalPriceWithoutShipping.toFixed(2)} zł
            </span>

            <span
              className={`${css.orderListEl} ${css.icon}`}
              onClick={() => {
                if (index !== dataVisible) setDataVisible(index);
                else setDataVisible(-1);
              }}
            >
              {index !== dataVisible ? (
                <AiOutlineArrowDown />
              ) : (
                <AiOutlineArrowLeft />
              )}
            </span>
          </div>
          {dataVisible !== -1 && index === dataVisible && (
            <div key={order._id} className={css.orderContainer}>
              <div className={css.prodList}>
                {data[dataVisible]?.orderProducts?.map(
                  (orderProd: IOrderProduct) => {
                    return (
                      <Link
                        key={orderProd._id}
                        to={`http://localhost:3000/product/${orderProd.product._id}`}
                      >
                        <div className={css.prodListEl}>
                          <img
                            className={css.img}
                            src={`http://localhost:9000/api/images/${orderProd.product.image}`}
                            alt="abc"
                          />
                          <span className={css.title}>
                            {orderProd.product.name}
                          </span>
                          <span className={css.price}>
                            {orderProd.price.toFixed(2)} zł
                          </span>
                          <span className={css.quantity}>
                            {orderProd.quantity}{" "}
                            {orderProd.quantity === 1
                              ? "sztuka"
                              : orderProd.quantity >= 2 &&
                                orderProd.quantity <= 4
                              ? "sztuki"
                              : "sztuk"}
                          </span>
                          <span className={css.price}>
                            {(orderProd.price * orderProd.quantity).toFixed(2)}{" "}
                            zł
                          </span>
                        </div>
                      </Link>
                    );
                  }
                )}
              </div>

              <div className={css.orderData}>
                <p className={css.miniTitle}>Data sprzedazy</p>
                <p>
                  {data[dataVisible].createdAt
                    .slice(0, 16)
                    .split("T")
                    .join(" ")}
                </p>
                <p className={css.miniTitle}>Płatność</p>
                <p>
                  {data[dataVisible].shipping.cashOnDelivery
                    ? "Za pobraniem"
                    : "Przed zamówieniem"}
                </p>
                <p className={css.miniTitle}>Opłacone</p>
                <p className={data[dataVisible].paid ? css.green : css.red}>
                  {data[dataVisible].paid ? "Tak" : "Nie"}
                </p>
              </div>

              <div className={css.deliveryData}>
                <p className={css.title}>Adres dostawy:</p>
                <div className={css.address}>
                  {" "}
                  <p>
                    {data[dataVisible].address.name}{" "}
                    {data[dataVisible].address.lastName}
                  </p>
                  <p>
                    ul. {data[dataVisible].address.street}{" "}
                    {data[dataVisible].address.houseNumber}
                  </p>
                  <p>
                    {data[dataVisible].address.code}{" "}
                    {data[dataVisible].address.city}
                  </p>
                </div>
                <br></br>
                <div className={css.contact}>
                  {" "}
                  <p>tel. {data[dataVisible].address.tel}</p>
                  <p>e-mail: {data[dataVisible].address.email}</p>
                </div>
              </div>
              <div className={css.shipping}>
                <span className={`${css.left} ${css.title}`}>
                  Sposób dostawy:
                </span>
                <span className={css.left}>
                  {data[dataVisible].shipping.name}
                </span>
                <span className={css.right}>
                  {data[dataVisible].shipping.price.toFixed(2)} zł
                </span>
              </div>
              <div className={css.summary}>
                <span className={css.left}>Suma brutto</span>
                <span className={css.right}>
                  {data &&
                    data[dataVisible].totalPriceWithoutShipping.toFixed(2)}{" "}
                  zł
                </span>
                <span className={css.left}>VAT</span>

                <span className={css.right}>
                  {data &&
                    (
                      (data[dataVisible].totalPriceWithoutShipping / 1.23) *
                      0.23
                    ).toFixed(2)}{" "}
                  zł
                </span>
                <span className={css.left}>Koszt wysyłki</span>

                <span className={css.right}>
                  {data && data[dataVisible].shipping.price.toFixed(2)} zł
                </span>
                <span className={css.line}></span>
                <span className={`${css.left} ${css.total}`}>
                  {" "}
                  Kwota końcowa
                </span>
                <span className={`${css.right} ${css.total}`}>
                  {(
                    data[dataVisible].totalPriceWithoutShipping +
                    data[dataVisible].shipping.price
                  ).toFixed(2)}{" "}
                  zł
                </span>
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
}
export default OrderComponent;
