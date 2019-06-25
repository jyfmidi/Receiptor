/**
 * 和业务相关的一些常量
 */

/**
 * 用户账号状态
 */
export const USER_STATUS_REVIEWING = 0 // 审核中
export const USER_STATUS_APPROVED = 1 // 审核通过
export const USER_STATUS_REJECTED = 2 // 审核未通过

/**
 * 用户账号权限
 */
export const USER_PERMISSION_ADMIN = 0 // 管理员
export const USER_PERMISSION_OTHER = 1 // 普通用户

/**
 * 项目状态
 */
export const PROJECT_STATUS_INPROCESSING = 0 // 项目进行中
export const PROJECT_STATUS_FINISHED = 1 // 项目完成
export const PROJECT_STATUS_REJECTED = 2 // 项目取消

/**
 * 账目状态
 */
export const TRANSACTION_STATUS_REVIEWING = 0 // 审核中
export const TRANSACTION_STATUS_APPROVED = 1 // 审核完毕待收款
export const TRANSACTION_STATUS_FINISHED = 2 // 完成
export const TRANSACTION_STATUS_REJECTED = 3 // 审核未通过

/**
 * 账单金额出入
 */
export const TRANSACTION_FLOW_IN = 0 // 收入
export const TRANSACTION_FLOW_OUT = 1 // 支出

/**
 * 账目事件状态
 */
export const TRANSACTION_EVENT_CREATE = 0 // 项目创建
export const TRANSACTION_EVENT_APPROVE = 1 // 项目审核
export const TRANSACTION_EVENT_REJECT = 2 // 项目拒绝
export const TRANSACTION_EVENT_UPDATE = 3 // 项目修改