<script>
    async function forceUpdateApp() {
        if ('caches' in window) {
            try {
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map(name => caches.delete(name)));
            } catch (err) { console.error(err); }
        }
        if ('serviceWorker' in navigator) {
            try {
                const regs = await navigator.serviceWorker.getRegistrations();
                for (let reg of regs) await reg.unregister();
            } catch (err) { console.error(err); }
        }
        window.location.href = window.location.pathname + "?v=" + new Date().getTime();
    }
</script>

<div class="fixed inset-0 bg-slate-900/80 flex items-center justify-center p-4 backdrop-blur-sm" style="z-index: 99999;">
    <div class="bg-white p-6 rounded-2xl shadow-2xl text-center w-full max-w-sm mx-auto animate-popIn">
        <div class="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="material-icons-round text-3xl">system_update</span>
        </div>
        <h3 class="text-xl font-black text-slate-800 mb-2">Đã có bản cập nhật mới!</h3>
        <p class="text-sm text-slate-500 mb-6">Hệ thống vừa được nâng cấp tính năng và sửa lỗi. Vui lòng cập nhật để sử dụng ổn định nhất.</p>
        <button class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-colors" on:click={forceUpdateApp}>
            Tải Cập Nhật Ngay
        </button>
    </div>
</div>

<style>
  .animate-popIn { animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
  @keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
</style>