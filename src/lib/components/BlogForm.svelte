<script lang="ts">
	import { page } from '$app/state';
	import { blogSchema, type BlogSchema } from '$lib/schema/blog.schema';
	import { Tipex } from '@friendofsvelte/tipex';
	import '@friendofsvelte/tipex/styles/index.css';
	import type { Editor } from '@tiptap/core';
	import { Control, Field, Label, Description, FieldErrors } from 'formsnap';
	import { toast } from 'svelte-sonner';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { form: formProp }: { form: SuperValidated<BlogSchema> } = $props();

	const form = superForm(formProp, {
		validators: zodClient(blogSchema),
		validationMethod: 'oninput',
		delayMs: 500,
		onResult: ({ result }) => {
			if (result.type === 'redirect') {
				toast.success('Blog created successfully');
			}
		}
	});

	const { form: formData, enhance, message, delayed, submitting } = form;

	let body = '';
	let editor: Editor | undefined = $state();
	let htmlContent = $derived(editor?.getHTML() ?? '');

	let tags = $state<string[]>([]);
	let tag = $state('');

	$effect(() => {
		$formData.tags = tags;
	});

	$effect(() => {
		$formData.content = htmlContent;
	});

	// Tambahkan state untuk file handling
	let fileInput: HTMLInputElement | undefined = $state();
	let selectedFile: File | null = $state(null);

	// Modifikasi function untuk handle file
	function handleFileChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			selectedFile = file;
			$formData.banner = file;
		}
	}

	function addTags() {
		if (tag === '') return;
		if (tags.length >= 5) {
			tag = '';
			return;
		}
		if (tags.find((t) => t === tag)) {
			tag = '';
			return;
		}
		tags.push(tag);
		tag = '';
	}

	function removeTags(tag: string) {
		tags = tags.filter((t) => t !== tag);
	}

	// Pastikan content dari editor ter-update
	$effect(() => {
		if (editor && htmlContent) {
			$formData.content = htmlContent;
		}
	});

	let url = $derived(page.url.pathname);
</script>

<div class="mx-auto w-full max-w-4xl">
	<form
		method="post"
		use:enhance
		class="flex flex-col gap-2"
		enctype="multipart/form-data"
		action={url}
	>
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
