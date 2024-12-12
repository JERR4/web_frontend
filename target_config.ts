const target_tauri = true

export const api_proxy_addr = "http://192.168.1.44:8000"
export const img_proxy_addr = "http://192.168.1.44:9000"
export const dest_api = (target_tauri) ? api_proxy_addr : "api"
export const dest_img =  (target_tauri) ?  img_proxy_addr : "img-proxy"
export const dest_root = (target_tauri) ? "" : "/web_frontend"