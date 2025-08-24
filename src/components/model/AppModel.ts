import { IEvents } from "components/base/events";
import { IProductItem } from "types";

/** Общая модель приложения */
export class AppModel {
    private _products: IProductItem[] = [];
    private _activeProduct: IProductItem | null = null;

    constructor(protected events: IEvents) { }

    /** Активный (выбранный) продукт */
    get activeProduct(): IProductItem | null {
        return this._activeProduct;
    }

    set activeProduct(product: IProductItem | null) {
        this._activeProduct = product;
        if (product) {
            this.events.emit('productModal:open', product);
        }
    }

    /** Список продуктов */
    get productList(): IProductItem[] {
        return this._products;
    }

    set productList(value: IProductItem[]) {
        this._products = value;
        this.events.emit('productList:updated', value);
    }
}
