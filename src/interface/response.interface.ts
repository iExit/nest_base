export interface IResponse {
  code: number;
  msg: any;
}

//
//

/**
 * 响应接口设计:
 * code 使用 http code 基本可以满足。
 * info 用于承载详情类，多个 info 使用不同的前缀，如 userInfo，articleInfo。
 * list 用于列表，多个列表参考 info。 pagination 用于承载分页信息。
 */

// 成功返回
// {
//   code: 200,
//   data: {
//     // 详情类
//     info: {
//       // 返回数据
//     },

//     // 列表类
//     list: [],

//     pagination: {
//       total: 100,
//       pageSize: 10,
//       pages: 10,
//       page: 1,
//     },
//   },
//   message: "请求成功"
// },

// // 失败返回
// {
//   code: 400,
//   message: "查询失败",
// }
