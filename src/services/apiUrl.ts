import { apiURL } from "../enivironment";

export const GET_ALL_PEOPLE = apiURL + "people";

export const REGISTER = "users/register/";
export const INVITE_LOGIN = "users/invitation/accept/";
export const LOGIN = "/token";
export const FIRMWARE_SCAN_LIST = "firmware/firmware-scan-list";
export const UPDATE_ANALYSIS = "firmware/update-firmware";
export const INITIATE_COMPARISON = "firmware/compare-firmware";
export const GET_COMPARISON = "firmware/compare-firmware";
export const GET_COMPARISONS = "firmware/list-comparison";
export const DELETE_COMPARISON = "/firmware/compare-firmware";

export const GENERAL_ITEMS = "firmware/general-items";
export const GET_USER = "users/user-info/";
export const GET_MODELS = "firmware/firmware-scan-list";
export const GET_PAGINATED_MODELS =
  "firmware/firmware-scan-list?limit=14&offset=0";
export const GET_ANALYSIS = "firmware/firmware-meta-detail";
export const GET_FIRMWARE_NEWS = "firmware/google-news-data";
export const GET_COMMENTS = "firmware/comments";
export const POST_COMMENT = "firmware/comment";
export const POST_FIRMWARE = "firmware/upload-firmware";
export const EDIT_COMMENT = "firmware/comments/update";
export const DELETE_COMMENT = "firmware/comments/delete";
export const BINARY_SEARCH_HISTORY = "firmware/binary-search-history";
export const BINARY_SEARCH = "firmware/binary-search-api";
export const BINARY_SEARCH_INIT = "firmware/binary-init-search";
export const GET_BINARY_LIST_DETAILS = "firmware/retrieve-binary-search/";
export const INITIALIZE_BINARY_SEARCH = "firmware/init-binary-search/";
export const LIST_ALL_BINARY_SEARCH = "firmware/list-binary-search/";
export const GET_GENERAL_ITEMS = "firmware/general-items";
export const REFRESH_TOKEN = "token-refresh";
export const DELETE_FIRMWARE = "firmware/delete-firmware";

export const EDIT_USER_INFO = "users/user-info/update/";
export const CHANGE_PASSWORD = "users/change-password/";
export const DOWNLOAD_PDF = "firmware/pdf-download";
export const DOWNLOAD_FILE = "firmware/raw-file-download";

export const SYSTEM_STATUS = "/firmware/status/";
export const GET_ERROR_LOGS = "logs/";
export const GET_THREAT_COUNT = "firmware/total-threat-count/";
export const GET_ANALYSIS_COUNT = "firmware/firmware-threat-count/";
export const GET_MISSING_ANALYSIS = "firmware/missing-analysis/";
export const GET_FIRMWARE_STATISTICS = "firmware/get-statistics/";
export const BASIC_SEARCH = "/firmware/search-firmware";
export const ADVANCED_FIRMWARE_SEARCH = "/firmware/advanced-search";
export const GET_RADARE_URL = "firmware/get-radare-url";
export const GET_THREAT_INTELLIGENCE = "firmware/get-threat-intelligence";
export const GET_THREAT_DETAILS = "/firmware/firmware-threat-detail/";

export const DELETE_NOTIFICATIONS = "users/clear-notifications/";
export const GET_NOTIFICATIONS = "users/all-notifications/";
export const MARK_NOTIFICATION_AS_READ = "users/mark-notifications-as-read";
export const MARK_ALL_NOTIFICATIONS_AS_READ =
  "/users/mark-notifications-as-read/";

export const EMULATOR_SCANS = "emulator/scans/";
export const EMULATOR_ROOT = "emulator/root-fs/";
export const EMULATOR_CREATE = "emulator/create-scan/";
export const SEND_INVITE = "users/send-invitation/";
export const GET_TEAMS = "users/teams/";
export const CREATE_TEAM = "users/teams/";
export const DELETE_TEAM = (id = "") => `users/teams/${id}/`;
export const UPDATE_TEAM = (id = "") => `users/teams/${id}/`;
export const GET_INVITED_LIST = "users/invitations/";
export const CANCEL_INVITATION = "users/invitations";
export const DELETE_TEAM_MEMBER = "users/remove-team-member";

export const UPLOAD_TICKET = "/create_ticket/";
export const VIRUS_REPORT = "malware_module/get-report/";
export const VIRUS_UPLOAD = "malware_module/upload-file/";
export const HYBRID_UPLOAD = "malware_module/upload-scan/";
export const VIRUS_LIST = "malware_module/virus_list/";
export const HYBRID_LIST = "malware_module/hybrid_analysis_list/";
export const SCAN_OVERVIEW = "malware_module/get-scan-overview/";
export const SCAN_REPORT = "malware_module/get-scan-report/";
export const SCAN_SUMMARY = "malware_module/get-scan-summary/";
export const DOMAIN_CHECK = "malware_module/scan_domain_malware/";
export const EXPLOIT_MITIGATION = "firmware/retrieve-exploit-mitigations/";
