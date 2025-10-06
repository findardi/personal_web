<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	let { name, open = $bindable() }: { name: string; open?: () => void } = $props();
	let dialog: HTMLDialogElement | null = $state(null);

	// Assign fungsi open ke prop yang bindable
	open = () => {
		dialog?.showModal();
	};

	function close() {
		dialog?.close();
	}

	let loading = $state(false);
	function customEnhance() {
		loading = true;

		return async ({ result, update }: any) => {
			if (result.type === 'redirect') {
				toast.success('Success delete blog');
				// await invalidateAll();
				goto(result.location);
				return;
			} else if (result.type === 'failure') {
				const errors = result.data?.errors;
				if (errors && typeof errors === 'object') {
					for (const [field, messages] of Object.entries(errors)) {
						if (Array.isArray(messages)) {
							for (const message of messages) {
								toast.error(`${field}: ${message}`);
							}
						}
					}
				} else if (result.data?.message) {
					toast.error(result.data.message);
				} else {
					toast.error('An unknown error occurred.');
				}
			}

			loading = false;
		};
	}
</script>

<dialog bind:this={dialog} id={name} class="modal">
	<div class="modal-box">
		<div class="flex flex-col items-center">
			<div>
				<h3 class="text-center text-2xl font-bold text-red-700">Warning!</h3>
				<p class="flex items-center justify-center py-4 text-center">
					This action may permanently delete this blog. Please carefully consider your action before
					proceeding.
				</p>
			</div>
			<div class="flex items-center justify-center space-x-5">
				<div class="modal-action">
					<form method="post" use:enhance={customEnhance}>
						<button class="btn btn-error" type="submit" disabled={loading}>
							{loading ? 'Deleting...' : 'Delete'}
						</button>
					</form>
				</div>
				<div class="modal-action">
					<form method="dialog">
						<button class="btn">Cancel</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</dialog>
