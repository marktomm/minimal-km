export namespace BackendApi {
  export interface ErrorResponse {
    path: string;
    timestamp: string;
    status: 'error';
    message: string;
  }

  export interface SuccessResponse<T = void> {
    status: 'done';
    message: string;
    data: T;
  }

  export interface SimpleGetData {
    id: number;
    body: string;
    postId: number;
  }

  export interface DateData {
    topic: string;
    date: string;
  }

  export interface GetResponse extends SuccessResponse<SimpleGetData> {}
}
