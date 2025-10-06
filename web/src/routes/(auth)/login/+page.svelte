<script lang="ts">
	import { Control, Field, Label, FieldErrors } from 'formsnap';
	import { userSchema, type UserSchema } from '$lib/schema/user.schema';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const form = superForm(data.form, {
		validators: zodClient(userSchema),
		validationMethod: 'oninput',
		delayMs: 300,
		onResult: ({ result }) => {
			if (result.type === 'redirect') {
				toast.success('Login berhasil');
				return;
			}

			if (result.type === 'failure') {
				const payload = result.data?.message ?? result.data;
				let message = 'Login gagal';

				if (typeof payload === 'string') {
					message = payload;
				} else if (payload?.message && typeof payload.message === 'string') {
					message = payload.message;
				} else if (payload?.fullError && typeof payload.fullError === 'string') {
					message = payload.fullError;
				} else if (result.data?.form?.message) {
					message = result.data.form.message;
				} else {
					console.log('Login failure payload:', payload);
				}

				toast.error(message);
			}
		}
	});

	const { form: formData, enhance, submitting } = form;
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="card w-96 bg-base-100 p-6">
		<h2 class="mb-4 text-xl font-bold">Login</h2>

		<form method="post" use:enhance class="flex flex-col gap-3">
			<Field {form} name="username">
				<Control>
					{#snippet children({ props })}
						<Label>Username</Label>
						<input
							type="text"
							class="input-bordered input w-full"
							placeholder="Username"
							{...props}
							bind:value={$formData.username}
						/>
					{/snippet}
				</Control>
				<FieldErrors class="mt-1 text-sm text-red-400" />
			</Field>

			<Field {form} name="password">
				<Control>
					{#snippet children({ props })}
						<Label>Password</Label>
						<input
							type="password"
							class="input-bordered input w-full"
							placeholder="Password"
							{...props}
							bind:value={$formData.password}
						/>
					{/snippet}
				</Control>
				<FieldErrors class="mt-1 text-sm text-red-400" />
			</Field>

			<div class="flex justify-end">
				<button class="btn btn-primary" type="submit" disabled={$submitting}>
					{#if $submitting}
						<span class="loading loading-spinner"></span>
						Mengirim...
					{:else}
						Login
					{/if}
				</button>
			</div>
		</form>
	</div>
</div>
