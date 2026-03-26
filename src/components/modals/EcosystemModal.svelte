<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
</script>

<div class="fixed inset-0 bg-slate-900/80 flex items-center justify-center p-4 backdrop-blur-sm" style="z-index: 99999;">
    <div class="bg-white p-5 rounded-2xl shadow-2xl w-full max-w-sm mx-auto animate-popIn relative">
        <button class="absolute top-3 right-3 text-slate-400 hover:text-red-500 bg-slate-100 rounded-full p-1 transition-colors" on:click={() => dispatch('close')}>
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

<style>
  .animate-popIn { animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
  @keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
</style>