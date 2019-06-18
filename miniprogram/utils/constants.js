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
 * 项状态
 */
export const ENTRY_STATUS_REVIEWING = 0 // 审核中
export const ENTRY_STATUS_APPROVED = 1 // 审核通过
export const ENTRY_STATUS_REJECTED = 2 // 审核未通过

/**
 * 用户与项关系
 */
export const UE_NO_RELATION = 0 // 没有任何关系
export const UE_IS_CREATOR = 1 // 创建者
export const UE_IS_OTHER = 2 // 相关人员
