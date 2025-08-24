import { ApiListResponse, ApiBase } from 'components/base/api'
import { IProductItem, IOrder, IOrderResponse } from 'types';

/** Модуль для работы с API сервера */
export class Api extends ApiBase {
  readonly cdnUrl: string;

  constructor(cdnUrl: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdnUrl = cdnUrl;
  }

  /** Получает список продуктов */
  getProductList(): Promise<IProductItem[]> {
    return this.get<ApiListResponse<IProductItem>>('/product').then((resp) =>
      resp.items.map((item) => ({
        ...item,
        image: this.cdnUrl + item.image,
      }))
    );
  }

  /** Оформляет заказ */
  placeOrder(order: IOrder): Promise<IOrderResponse> {
    return this.post<IOrderResponse>(`/order`, order);
  }
}