/** Товар */
export interface IProductItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface IActions {
  onClick: (event: MouseEvent) => void;
}

/** Заказ */
export interface IOrder {
  payment?: string;
  address?: string;
  phone?: string;
  email?: string;
  total?: number;
  items: string[];
}

/** Результат оформления заказа */
export interface IOrderResponse {
  id: string;
  total: number;
}

/** Форма оформления заказа */
export interface ICheckoutForm extends Omit<IOrder, 'items' | 'total'> { }

/** Поле оформления заказа */
export enum ECheckoutFieldKey {
  Payment = 'payment',
  Email = 'email',
  Phone = 'phone',
  Address = 'address'
}

/** Шаги оформления заказа */
export enum ECheckoutStep {
  Order = 'order',
  Contacts = 'contacts'
}

/** Настройки полей формы заказа */
export type CheckoutField = {
  validator: (value: string) => string;
  formatter?: (value: string) => string;
  step: ECheckoutStep;
  error: string;
  value: string;
};

export interface IUpdateFieldEvent {
  field: ECheckoutFieldKey,
  value: string
}
