import { apiUrl } from "./constant"


//Admin Side Endpoints
export const adminLoginEP = `${apiUrl}/admin/login`
export const loadUsersEP = `${apiUrl}/admin/loadUsers`
export const blockUserEP = `${apiUrl}/admin/blockUser`
export const unblockOrBlockUserEP = `${apiUrl}/admin/unBlocOrBlockkUser`
export const loadPlansEP = `${apiUrl}/admin/loadPlans`
export const deletePlanEP = `${apiUrl}/admin/deletePlan`
export const addPlanEP = `${apiUrl}/admin/addPlan`
export const editPlanEP = `${apiUrl}/admin/editPlan`
//User Side Endpoints
export const userRegisterEP = `${apiUrl}/register`
export const loginWithOtpEP = `${apiUrl}/loginWithOtp`
export const verifyOtpEP = `${apiUrl}/verifyOtp`
export const flatmateRequirementEP = `${apiUrl}/roommateReqPost`
export const flatRequirementEP = `${apiUrl}/roomReqPost`
export const flatMatePostsLoadingEP = `${apiUrl}/loadposts`
export const flatPostsLoadingEP = `${apiUrl}/loadroomposts`
export const profileLoadingEP = `${apiUrl}/loadProfile`
export const userVerifyEP = `${apiUrl}/verify`
export const flatmatePostDeleteEP = `${apiUrl}/deletePost`
export const flatPostDeleteEP = `${apiUrl}/deleteRoomPost`
export const profileUpdateEP = `${apiUrl}/updateProfile`
export const otpExpiryLoadEP = `${apiUrl}/loadOtpexpiry`
export const resendOtpEP = `${apiUrl}/loadOtpexpiry`
export const flatPostUpdateEP = `${apiUrl}/updateRoomPost`
export const flatmatePostUpdateEP = `${apiUrl}/roomMatepostUpdate`
export const razorPayEP = `${apiUrl}/SubscribePremium`
export const updatePremiumEP = `${apiUrl}/paymentUpdate`
export const sendMessageEP = `${apiUrl}/sendMessage`
export const loadChatsEP = `${apiUrl}/loadChats`

