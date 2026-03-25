<script>
  import { onMount } from 'svelte';
  import InstallmentCalc from './InstallmentCalc.svelte';
  import { db } from './firebase.js'; 
  import { doc, onSnapshot } from 'firebase/firestore';

  const APP_VERSION = 6; 
  let showUpdatePrompt = false;
  let showInstallGuide = false; 
  let showEcosystem = false; // Biến trạng thái bật/tắt Modal Hệ sinh thái

  onMount(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'tragop_config'), (docSnap) => {
        if (docSnap.exists()) {
            const serverVersion = docSnap.data().currentVersion || 1;
            if (serverVersion > APP_VERSION) {
                showUpdatePrompt = true;
            }
        }
    });
    return () => unsub();
  });

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

<main>
  <div class="w-full h-[100dvh] max-w-md mx-auto bg-white shadow-xl overflow-hidden relative">
    <InstallmentCalc 
        on:showInstallGuide={() => showInstallGuide = true} 
        on:showEcosystem={() => showEcosystem = true} 
    />
  </div>

  {#if showUpdatePrompt}
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
  {/if}

  {#if showInstallGuide}
  <div class="fixed inset-0 bg-slate-900/80 flex items-center justify-center p-4 backdrop-blur-sm" style="z-index: 99999;">
      <div class="bg-white p-5 rounded-2xl shadow-2xl w-full max-w-sm mx-auto animate-popIn relative">
          <button class="absolute top-3 right-3 text-slate-400 hover:text-red-500 bg-slate-100 rounded-full p-1 transition-colors" on:click={() => showInstallGuide = false}>
              <span class="material-icons-round text-lg block">close</span>
          </button>
          
          <h3 class="text-lg font-black text-slate-800 mb-4 text-center mt-2">Cài Đặt Ứng Dụng</h3>

          <div class="space-y-3 text-left">
              <div class="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                  <h4 class="font-bold text-slate-700 flex items-center gap-1 mb-2 text-sm">
                      <span class="text-lg">🍎</span> Dành cho iPhone/iPad
                  </h4>
                  <ol class="text-[13px] text-slate-600 space-y-1.5 list-decimal ml-5">
                      <li>Mở web này bằng trình duyệt <b>Safari</b>.</li>
                      <li>Bấm nút <b>Chia sẻ <span class="material-icons-round text-[12px] align-middle">ios_share</span></b> ở thanh dưới cùng.</li>
                      <li>Cuộn xuống chọn <b>Thêm vào MH chính</b> (Add to Home Screen).</li>
                  </ol>
              </div>

              <div class="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                  <h4 class="font-bold text-slate-700 flex items-center gap-1 mb-2 text-sm">
                      <span class="text-lg">🤖</span> Dành cho Android
                  </h4>
                  <ol class="text-[13px] text-slate-600 space-y-1.5 list-decimal ml-5">
                      <li>Mở web này bằng trình duyệt <b>Chrome</b>.</li>
                      <li>Bấm vào biểu tượng <b>3 chấm <span class="material-icons-round text-[12px] align-middle">more_vert</span></b> ở góc phải trên.</li>
                      <li>Chọn <b>Thêm vào Màn hình chính</b> (Install App).</li>
                  </ol>
              </div>
          </div>
      </div>
  </div>
  {/if}

  {#if showEcosystem}
  <div class="fixed inset-0 bg-slate-900/80 flex items-center justify-center p-4 backdrop-blur-sm" style="z-index: 99999;">
      <div class="bg-white p-5 rounded-2xl shadow-2xl w-full max-w-sm mx-auto animate-popIn relative">
          <button class="absolute top-3 right-3 text-slate-400 hover:text-red-500 bg-slate-100 rounded-full p-1 transition-colors" on:click={() => showEcosystem = false}>
              <span class="material-icons-round text-lg block">close</span>
          </button>
          
          <h3 class="text-lg font-black text-slate-800 mb-4 text-center mt-2 flex items-center justify-center gap-2">
              <span class="material-icons-round text-indigo-500">apps</span> Hỗ Trợ Công Việc
          </h3>

          <div class="space-y-2.5 text-left">
              <a href="https://qlstmwg.netlify.app/" target="_blank" class="flex items-center justify-between bg-blue-50/50 p-3 rounded-xl border border-blue-100 hover:bg-blue-100 hover:border-blue-200 transition-all text-slate-700 font-bold text-[13px] active:scale-95 group">
                  <div class="flex items-center gap-2.5">
                      <span class="text-xl">📊</span>
                      <span>Đổ số chi tiết ST</span>
                  </div>
                  <span class="material-icons-round text-[16px] text-blue-400 group-hover:text-blue-600">open_in_new</span>
              </a>

              <a href="https://checklistwork.netlify.app/" target="_blank" class="flex items-center justify-between bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200 transition-all text-slate-700 font-bold text-[13px] active:scale-95 group">
                  <div class="flex items-center gap-2.5">
                      <span class="text-xl">📅</span>
                      <span>Lịch làm việc, chấm 8 NTTT</span>
                  </div>
                  <span class="material-icons-round text-[16px] text-emerald-400 group-hover:text-emerald-600">open_in_new</span>
              </a>

              <a href="https://tonkhodmx.netlify.app/" target="_blank" class="flex items-center justify-between bg-orange-50/50 p-3 rounded-xl border border-orange-100 hover:bg-orange-100 hover:border-orange-200 transition-all text-slate-700 font-bold text-[13px] active:scale-95 group">
                  <div class="flex items-center gap-2.5">
                      <span class="text-xl">📦</span>
                      <span>Check tồn kho kho ngoài</span>
                  </div>
                  <span class="material-icons-round text-[16px] text-orange-400 group-hover:text-orange-600">open_in_new</span>
              </a>
          </div>
      </div>
  </div>
  {/if}

</main>

<style>
  .animate-popIn {
    animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  @keyframes popIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
</style>