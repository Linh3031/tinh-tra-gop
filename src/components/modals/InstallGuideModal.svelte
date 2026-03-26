<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
</script>

<div class="fixed inset-0 bg-slate-900/80 flex items-center justify-center p-4 backdrop-blur-sm" style="z-index: 99999;">
    <div class="bg-white p-5 rounded-2xl shadow-2xl w-full max-w-sm mx-auto animate-popIn relative">
        <button class="absolute top-3 right-3 text-slate-400 hover:text-red-500 bg-slate-100 rounded-full p-1 transition-colors" on:click={() => dispatch('close')}>
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

<style>
  .animate-popIn { animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
  @keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
</style>