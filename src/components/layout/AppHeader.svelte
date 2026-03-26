<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let totalUsage = 0;
</script>

<div class="bg-white px-3 py-3 flex items-center justify-between border-b border-slate-100 z-10 sticky top-0">
    <div class="flex items-center gap-2">
        <img src="/logo-header.jpg" alt="Logo" class="w-8 h-8 rounded-lg object-cover shadow-sm border border-slate-200">
        <h1 class="text-base font-black text-indigo-700 uppercase tracking-tight">Tính Trả Chậm</h1>
    </div>
    
    <div class="flex items-center gap-1.5">
        <div class="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-full text-slate-600 border border-slate-200 shadow-inner">
            <span class="material-icons-round text-[14px]">bar_chart</span>
            <span class="text-xs font-black">{totalUsage}</span>
        </div>
        
        <button on:click={() => dispatch('showEcosystem')} class="w-7 h-7 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center border border-indigo-200 hover:bg-indigo-100 transition-all shadow-sm active:scale-95" title="Hỗ trợ công việc">
            <span class="material-icons-round text-[16px]">apps</span>
        </button>

        <button on:click={() => dispatch('showInstallGuide')} class="w-7 h-7 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center border border-slate-200 animate-pulse hover:bg-slate-100 hover:animate-none transition-all shadow-sm active:scale-95" title="Hướng dẫn cài đặt App">
            <span class="material-icons-round text-[16px]">install_mobile</span>
        </button>
    </div>
</div>