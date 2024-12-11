/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateUpdatePart {
  /** ID */
  id: number;
  /** Active add */
  active_add?: boolean;
  /**
   * Название детали
   * @minLength 1
   * @maxLength 100
   */
  part_name: string;
  /**
   * Спецификация
   * @minLength 1
   * @maxLength 50
   */
  specification: string;
  /**
   * OEM номер
   * @minLength 1
   * @maxLength 50
   */
  oem_number: string;
  /** Статус */
  status?: true | false;
  /**
   * Краткое описание
   * @maxLength 800
   */
  short_description?: string;
  /**
   * Состав набора
   * @maxLength 1200
   */
  set_composition?: string;
  /**
   * Размеры
   * @minLength 1
   * @maxLength 50
   */
  dimensions: string;
  /** Вес */
  weight: number;
}

export interface Part {
  /** ID */
  id: number;
  /** Active add */
  active_add?: boolean;
  /** Quantity */
  quantity?: number;
  /**
   * Название детали
   * @minLength 1
   * @maxLength 100
   */
  part_name: string;
  /**
   * Спецификация
   * @minLength 1
   * @maxLength 50
   */
  specification: string;
  /**
   * OEM номер
   * @minLength 1
   * @maxLength 50
   */
  oem_number: string;
  /** Статус */
  status?: true | false;
  /**
   * Изображение
   * @format uri
   * @maxLength 200
   */
  image?: string | null;
  /**
   * Краткое описание
   * @maxLength 800
   */
  short_description?: string;
  /**
   * Состав набора
   * @maxLength 1200
   */
  set_composition?: string;
  /**
   * Размеры
   * @minLength 1
   * @maxLength 50
   */
  dimensions: string;
  /** Вес */
  weight: number;
}

export interface Shipments {
  /** ID */
  id: number;
  /** Parts amount */
  parts_amount?: string;
  /** Owner */
  owner?: string;
  /** Moderator */
  moderator?: string;
  /** Статус */
  status?: 1 | 2 | 3 | 4 | 5;
  /**
   * Дата создания
   * @format date-time
   */
  creation_date: string;
  /**
   * Дата формирования
   * @format date-time
   */
  formation_date?: string | null;
  /**
   * Дата запланированного завершения
   * @format date
   */
  planned_date?: string | null;
  /**
   * Дата завершения
   * @format date-time
   */
  completion_date?: string | null;
  /**
   * Название склада
   * @maxLength 50
   */
  storage?: string | null;
  /** Тип операции */
  operation_type?: true | false | null;
  /**
   * Номер автомобиля
   * @maxLength 10
   */
  license_plate_number?: string | null;
}

export interface PartShipment {
  /** ID */
  id?: number;
  /**
   * Поле М-М
   * @min 0
   * @max 2147483647
   */
  quantity?: number;
  /** Отправка */
  shipment: number;
  /** Деталь */
  part: number;
}

export interface User {
  /** ID */
  id?: number;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://127.0.0.1:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Parts storage API
 * @version v1
 * @license BSD License
 * @baseUrl http://127.0.0.1:8000
 * @contact <yaroslav.auto@gmail.com>
 *
 * API for parts storage
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  parts = {
    /**
     * No description
     *
     * @tags parts
     * @name PartsCreateCreate
     * @request POST:/parts/create/
     * @secure
     */
    partsCreateCreate: (data: CreateUpdatePart, params: RequestParams = {}) =>
      this.request<Part, void>({
        path: `/parts/create/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags parts
     * @name PartsSearchList
     * @request GET:/parts/search/
     * @secure
     */
    partsSearchList: (
      query?: {
        /** Фильтрация по частичному совпадению имени детали */
        part_name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** Список найденных деталей */
          parts?: object[];
          /** ID черновика отправки, если существует */
          draft_shipment_id?: number | null;
          /** Количество деталей в отправке, если существует */
          parts_amount?: number | null;
        },
        void
      >({
        path: `/parts/search/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags parts
     * @name PartsRead
     * @request GET:/parts/{part_id}/
     * @secure
     */
    partsRead: (partId: string, params: RequestParams = {}) =>
      this.request<Part, void>({
        path: `/parts/${partId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags parts
     * @name PartsAddToShipmentCreate
     * @request POST:/parts/{part_id}/add_to_shipment/
     * @secure
     */
    partsAddToShipmentCreate: (partId: string, params: RequestParams = {}) =>
      this.request<Shipments, void>({
        path: `/parts/${partId}/add_to_shipment/`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags parts
     * @name PartsDeleteDelete
     * @request DELETE:/parts/{part_id}/delete/
     * @secure
     */
    partsDeleteDelete: (partId: string, params: RequestParams = {}) =>
      this.request<Part[], void>({
        path: `/parts/${partId}/delete/`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags parts
     * @name PartsUpdateUpdate
     * @request PUT:/parts/{part_id}/update/
     * @secure
     */
    partsUpdateUpdate: (partId: string, data: CreateUpdatePart, params: RequestParams = {}) =>
      this.request<Part, void>({
        path: `/parts/${partId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags parts
     * @name PartsUpdateImageCreate
     * @request POST:/parts/{part_id}/update_image/
     * @secure
     */
    partsUpdateImageCreate: (
      partId: string,
      data: {
        /**
         * Новое изображение для детали
         * @format binary
         */
        image: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<Part, void>({
        path: `/parts/${partId}/update_image/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  shipments = {
    /**
     * No description
     *
     * @tags shipments
     * @name ShipmentsSearchList
     * @request GET:/shipments/search/
     * @secure
     */
    shipmentsSearchList: (
      query?: {
        /** Фильтр по статусу отправки */
        status?: number;
        /**
         * Начальная дата формирования (формат: YYYY-MM-DDTHH:MM:SS)
         * @format date-time
         */
        date_formation_start?: string;
        /**
         * Конечная дата формирования (формат: YYYY-MM-DDTHH:MM:SS)
         * @format date-time
         */
        date_formation_end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Shipments[], void>({
        path: `/shipments/search/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags shipments
     * @name ShipmentsRead
     * @request GET:/shipments/{shipment_id}/
     * @secure
     */
    shipmentsRead: (shipmentId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** ID */
          id?: number;
          /** Parts amount */
          parts_amount?: number;
          /** Owner */
          owner?: string;
          /** Parts */
          parts?: {
            id?: number;
            part_name?: string;
            specification?: string;
            oem_number?: string;
            /** @format uri */
            image?: string;
          }[];
          /** Moderator */
          moderator?: string | null;
          /** Статус */
          status?: 1 | 2 | 3 | 4 | 5;
          /**
           * Дата создания
           * @format date-time
           */
          creation_date?: string;
          /**
           * Дата формирования
           * @format date-time
           */
          formation_date?: string | null;
          /**
           * Дата запланированного завершения
           * @format date
           */
          planned_date?: string | null;
          /**
           * Дата завершения
           * @format date-time
           */
          completion_date?: string | null;
          /**
           * Название склада
           * @maxLength 50
           */
          storage?: string | null;
          /** Тип операции */
          operation_type?: true | false | null;
          /**
           * Номер автомобиля
           * @maxLength 10
           */
          license_plate_number?: string | null;
        },
        void
      >({
        path: `/shipments/${shipmentId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags shipments
     * @name ShipmentsDeleteDelete
     * @request DELETE:/shipments/{shipment_id}/delete/
     * @secure
     */
    shipmentsDeleteDelete: (shipmentId: string, params: RequestParams = {}) =>
      this.request<Shipments, void>({
        path: `/shipments/${shipmentId}/delete/`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags shipments
     * @name ShipmentsDeletePartFromShipmentDelete
     * @request DELETE:/shipments/{shipment_id}/delete_part_from_shipment/{part_id}
     * @secure
     */
    shipmentsDeletePartFromShipmentDelete: (shipmentId: string, partId: string, params: RequestParams = {}) =>
      this.request<Part[], void>({
        path: `/shipments/${shipmentId}/delete_part_from_shipment/${partId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags shipments
     * @name ShipmentsUpdateUpdate
     * @request PUT:/shipments/{shipment_id}/update/
     * @secure
     */
    shipmentsUpdateUpdate: (
      shipmentId: string,
      data: {
        /**
         * Запланированная дата отправки (формат: YYYY-MM-DDTHH:MM:SS)
         * @format date-time
         */
        planned_date?: string;
        /** Название склада, с которого будет произведена отправка */
        storage?: string;
        /** Тип отправки (доставка/отгрузка) */
        operation_type?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<Shipments, void>({
        path: `/shipments/${shipmentId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags shipments
     * @name ShipmentsUpdatePartShipmentUpdate
     * @request PUT:/shipments/{shipment_id}/update_part_shipment/{part_id}
     * @secure
     */
    shipmentsUpdatePartShipmentUpdate: (
      shipmentId: string,
      partId: string,
      data: {
        /** Новое количество деталей */
        quantity: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PartShipment, void>({
        path: `/shipments/${shipmentId}/update_part_shipment/${partId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags shipments
     * @name ShipmentsUpdateStatusAdminUpdate
     * @request PUT:/shipments/{shipment_id}/update_status_admin/
     * @secure
     */
    shipmentsUpdateStatusAdminUpdate: (
      shipmentId: string,
      data: {
        /** Новый статус отправки (4 для завершения, 5 для отклонения) */
        status: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Shipments, void>({
        path: `/shipments/${shipmentId}/update_status_admin/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags shipments
     * @name ShipmentsUpdateStatusUserUpdate
     * @request PUT:/shipments/{shipment_id}/update_status_user/
     * @secure
     */
    shipmentsUpdateStatusUserUpdate: (shipmentId: string, params: RequestParams = {}) =>
      this.request<Shipments, void>({
        path: `/shipments/${shipmentId}/update_status_user/`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersLoginCreate
     * @request POST:/users/login/
     * @secure
     */
    usersLoginCreate: (
      data: {
        /** username */
        username: string;
        /** password */
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        User,
        {
          error?: string;
        }
      >({
        path: `/users/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersLogoutCreate
     * @request POST:/users/logout/
     * @secure
     */
    usersLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegisterCreate
     * @request POST:/users/register/
     * @secure
     */
    usersRegisterCreate: (data: User, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/register/`,
        method: "POST",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdateUpdate
     * @request PUT:/users/update/
     * @secure
     */
    usersUpdateUpdate: (data: User, params: RequestParams = {}) =>
      this.request<User, void>({
        path: `/users/update/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
