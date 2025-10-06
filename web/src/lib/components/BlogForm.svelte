<script lang="ts">
	import { page } from '$app/state';
	import { blogSchema, type BlogSchema } from '$lib/schema/blog.schema';
	import { Tipex } from '@friendofsvelte/tipex';
	import '@friendofsvelte/tipex/styles/index.css';
	import type { Editor } from '@tiptap/core';
	import { Control, Field, Label, FieldErrors } from 'formsnap';
	import { toast } from 'svelte-sonner';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { form: formProp }: { form: SuperValidated<BlogSchema> } = $props();
	let url = $derived(page.url.pathname);

	const form = superForm(formProp, {
		validators: zodClient(blogSchema),
		validationMethod: 'oninput',
		delayMs: 500,
		onResult: ({ result }) => {
			if (result.type === 'redirect') {
				url.includes('/new')
					? toast.success('Blog created successfully')
					: toast.success('Blog updated successfully');
			} else if (result.type === 'failure') {
				const errors = result.data?.form.errors;
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
		}
	});

	const { form: formData, enhance, delayed, submitting } = form;

	// --- Editor setup ---
	let body = $formData.content || '';
	let editor: Editor | undefined = $state();
	let htmlContent = $derived(editor?.getHTML() ?? '');

	// --- Normalisasi tags awal ---
	function normalizeTags(input: unknown): string[] {
		if (!input) return [];
		if (Array.isArray(input)) {
			if (input.length === 1 && typeof input[0] === 'string' && input[0].includes(',')) {
				return input[0]
					.split(',')
					.map((s) => s.trim())
					.filter(Boolean);
			}
			return input.map((s) => s.toString().trim()).filter(Boolean);
		}
		if (typeof input === 'string') {
			return input
				.split(',')
				.map((s) => s.trim())
				.filter(Boolean);
		}
		return [];
	}

	let tags = $state<string[]>(normalizeTags($formData.tags));
	let tag = $state('');

	// --- Sync ke formData ---
	$effect(() => {
		$formData.tags = tags;
	});

	$effect(() => {
		$formData.content = htmlContent;
	});

	// --- File Handling ---
	let fileInput: HTMLInputElement | undefined = $state();
	let selectedFile: File | null = $state(null);

	function handleFileChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			selectedFile = file;
			$formData.banner = file;
		}
	}

	// --- Tags actions ---
	function addTags() {
		const trimmed = tag.trim();
		if (!trimmed) return;
		if (tags.length >= 5) {
			toast.error('Max 5 tags allowed');
			tag = '';
			return;
		}
		if (tags.includes(trimmed)) {
			tag = '';
			return;
		}
		tags = [...tags, trimmed];
		tag = '';
	}

	function removeTags(t: string) {
		tags = tags.filter((x) => x !== t);
	}
</script>

<div class="mx-auto w-full max-w-4xl">
	<form method="post" use:enhance class="flex flex-col gap-2" enctype="multipart/form-data">
		<Field {form} name="title">
			<Control>
				{#snippet children({ props })}
					<Label>Title</Label>
					<input
						type="text"
						class="input-bordered input w-full"
						placeholder="Input new title"
						{...props}
						bind:value={$formData.title}
					/>
				{/snippet}
			</Control>
			<FieldErrors class="mt-1 text-sm text-red-400" />
		</Field>

		<Field {form} name="description">
			<Control>
				{#snippet children({ props })}
					<Label>Description</Label>
					<input
						type="text"
						class="input-bordered input w-full"
						placeholder="Input new description"
						{...props}
						bind:value={$formData.description}
					/>
				{/snippet}
			</Control>
			<FieldErrors class="mt-1 text-sm text-red-400" />
		</Field>

		<Field {form} name="banner">
			<Control>
				{#snippet children({ props })}
					<Label>Banner Image</Label>
					<input
						bind:this={fileInput}
						type="file"
						accept="image/jpeg,image/png,image/webp,image/jpg"
						class="file-input-bordered file-input w-full"
						onchange={handleFileChange}
					/>
					<p class="mt-1 text-xs text-gray-500 italic">* opsional</p>
				{/snippet}
			</Control>
			<FieldErrors class="mt-1 text-sm text-red-400" />
		</Field>

		<Field {form} name="tags">
			<Control>
				{#snippet children({ props })}
					<Label>Tags</Label>
					<div class="flex flex-col gap-2 sm:flex-row sm:items-start">
						<div class="flex flex-1 gap-2">
							<input
								type="text"
								class="input-bordered input flex-1"
								placeholder="Press enter to add"
								bind:value={tag}
								onkeydown={(e) => {
									if (e.key === 'Enter') {
										e.preventDefault();
										addTags();
									}
								}}
							/>
							<button type="button" onclick={addTags} class="btn btn-neutral">Add</button>
						</div>
					</div>
					<p class="mt-0 text-xs text-gray-500">Max 5 tags</p>

					<input type="hidden" {...props} bind:value={$formData.tags} />
				{/snippet}
			</Control>
			<div class="flex flex-wrap gap-2">
				{#each tags as tag}
					<div class="badge gap-1 badge-sm badge-accent">
						{tag}
						<button
							type="button"
							class="btn h-4 min-h-0 w-4 p-0 btn-ghost btn-xs"
							onclick={() => removeTags(tag)}
						>
							×
						</button>
					</div>
				{/each}
			</div>
			<FieldErrors class="text-sm text-red-400" />
		</Field>

		<Field {form} name="content">
			<Control>
				{#snippet children({ props })}
					<Label>Content</Label>
					<div class="w-full">
						<div
							class="min-h-[50vh] w-full rounded-md border border-neutral-200/80 bg-base-100 p-2 dark:border-base-content/20 dark:bg-base-200"
						>
							<Tipex
								{body}
								bind:tipex={editor}
								floating
								focal
								style="margin-top: 1rem; margin-bottom: 0;"
								class="prose h-[60vh] w-full max-w-none prose-neutral dark:prose-invert"
							/>
						</div>
					</div>
					<input type="hidden" {...props} bind:value={htmlContent} />
				{/snippet}
			</Control>
			<FieldErrors class="mt-1 text-sm text-red-400" />
		</Field>

		<div class="flex justify-end gap-2">
			<button class="btn btn-primary" type="submit" disabled={$submitting}>
				{#if $delayed}
					<span class="loading loading-spinner"></span>
					Saving...
				{:else}
					Submit
				{/if}
			</button>
		</div>
	</form>
</div>
