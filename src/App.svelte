<script>
  import { onMount } from 'svelte';
  import InstallmentCalc from './components/calculator/InstallmentCalc.svelte';
  import UpdateModal from './components/modals/UpdateModal.svelte';
  import InstallGuideModal from './components/modals/InstallGuideModal.svelte';
  import EcosystemModal from './components/modals/EcosystemModal.svelte';
  import { db } from './services/firebase.js';
  import { doc, onSnapshot } from 'firebase/firestore';

  const APP_VERSION = 6; 
  let showUpdatePrompt = false;
  let showInstallGuide = false;
  let showEcosystem = false; 

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
</script>

<main>
  <div class="w-full h-[100dvh] max-w-md mx-auto bg-white shadow-xl overflow-hidden relative">
    <InstallmentCalc 
        on:showInstallGuide={() => showInstallGuide = true} 
        on:showEcosystem={() => showEcosystem = true} 
    />
  </div>

  {#if showUpdatePrompt}
      <UpdateModal />
  {/if}

  {#if showInstallGuide}
      <InstallGuideModal on:close={() => showInstallGuide = false} />
  {/if}

  {#if showEcosystem}
      <EcosystemModal on:close={() => showEcosystem = false} />
  {/if}
</main>