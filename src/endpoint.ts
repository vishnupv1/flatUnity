import { apiUrl } from "./constant"


//ADMIN RELATED ENDPOINTS
export const adminLoginEP = `${apiUrl}/admin/login`

//USER RELATED ENDPOINTS
export const userRegisterEP = `${apiUrl}/register`
export const loginWithOtpEP = `${apiUrl}/loginWithOtp`
export const verifyOtpEP = `${apiUrl}/verifyOtp`
export const resendOtpEP = `${apiUrl}/resendOtp`
export const otpExpiryLoadEP = `${apiUrl}/loadOtpexpiry`
export const userVerifyEP = `${apiUrl}/verify`
export const profileLoadingEP = `${apiUrl}/loadProfile`
export const profileUpdateEP = `${apiUrl}/updateProfile`
export const loadUsersEP = `${apiUrl}/loadUsers`
export const blockUserEP = `${apiUrl}/blockUser`
export const unblockOrBlockUserEP = `${apiUrl}/unBlocOrBlockkUser`

//PREMIUM PLANS RELATED ENDPOINTS
export const razorPayEP = `${apiUrl}/plan/SubscribePremium`
export const updatePremiumEP = `${apiUrl}/plan/paymentUpdate`
export const loadPlansEP = `${apiUrl}/plan/loadPlans`
export const deletePlanEP = `${apiUrl}/plan/deletePlan`
export const addPlanEP = `${apiUrl}/plan/addPlan`
export const editPlanEP = `${apiUrl}/plan/editPlan`

//CHATROOM RELATED ENDPOINTS
export const loadChatmatesEP = `${apiUrl}/chatRoom/loadChatmates`

//CHAT RELATED ENDPOINTS
export const sendMessageEP = `${apiUrl}/chat/sendMessage`
export const loadChatsEP = `${apiUrl}/chat/loadChats`

//ROOM REQUIREMENT RELATED ENDPOINTS
export const flatRequirementEP = `${apiUrl}/roomReq/roomReqPost`
export const unBlockOrBlockRoomPostEp = `${apiUrl}/roomReq/unBlockOrBlockRoomPost`
export const flatPostsLoadingEP = `${apiUrl}/roomReq/loadroomposts`
export const flatPostDeleteEP = `${apiUrl}/roomReq/deleteRoomPost`
export const flatPostUpdateEP = `${apiUrl}/roomReq/updateRoomPost`

//ROOM MATE REQUIREMENT RELATED ENDPOINTS
export const flatMatePostsLoadingEP = `${apiUrl}/roomMateReq/loadposts`
export const flatmatePostUpdateEP = `${apiUrl}/roomMateReq/roomMatepostUpdate`
export const flatmatePostDeleteEP = `${apiUrl}/roomMateReq/deletePost`
export const flatmateRequirementEP = `${apiUrl}/roomMateReq/roommateReqPost`
export const unBlockOrBlockPostEp = `${apiUrl}/roomMateReq/unBlockOrBlockPost`
