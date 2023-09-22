<script lang="ts">
	import { FilePicker, FilePreview, List, Button, Progress } from 'stwui';
	import { formatFileSize } from 'stwui/utils';
	import type { DropResult, PickerPreviewFile } from 'stwui/types';
    import { UploadStatus } from 'stwui/enums/upload-status';
	import { fade, slide } from 'svelte/transition';
	import { writable, type Writable } from 'svelte/store';

	// interface ImageFile {
	// 	file: File;
	// 	src: string;
	// 	progress: number | undefined;
	// 	status: UploadStatus;
	// }

	// let myFiles: ImageFile[] = [];
	// let errors: string[] = [];

	// function handleButtonClick(event: Event) {
	// 	event.stopPropagation();
	// 	console.log('Inner button clicked');
	// }

	// /* Push the files to the array with a preview URL */
	// function onDrop(files: DropResult) {
	// 	let newFiles = files.accepted.map((file) => ({
	// 		file,
	// 		src: URL.createObjectURL(file),
	// 		progress: undefined,
	// 		status: UploadStatus.PENDING
	// 	}));

	// 	myFiles = [...myFiles, ...newFiles];
	// 	errors = files.rejected.map((file) => file.name);
	// }

	// /* Remove the file from the array if it exists */
	// function removeFile(file: ImageFile) {
	// 	URL.revokeObjectURL(file.src);
	// 	myFiles = [
	// 		...myFiles.slice(0, myFiles.indexOf(file)),
	// 		...myFiles.slice(myFiles.indexOf(file) + 1)
	// 	];
	// }

	// async function uploadFile(myFile: ImageFile) {
	// 	/* Your upload implementation */
	// }
    let myFiles: Writable<PickerPreviewFile[]> = writable([]);
	function handleButtonClick(event: Event) {
		event.stopPropagation();
		console.log('Inner button clicked');
	}
	/* Push the files to the array */
	function onDrop(files: DropResult) {
		let newFiles = files.accepted.map((file) => ({
			file,
			src: URL.createObjectURL(file),
			progress: undefined,
			status: UploadStatus.PENDING
		}));
		let newRejectedFiles = files.rejected.map((file) => ({
			file,
			src: URL.createObjectURL(file),
			progress: undefined,
			status: UploadStatus.REJECTED
		}));
		$myFiles = [...$myFiles, ...newRejectedFiles, ...newFiles];
		fakeUploadProgress();
	}
	/* This function simply fakes the upload for all the attached files. In reality you would calculate this */
	async function fakeUpload(idx: number, duration: number) {
		const startTime = Date.now();
		return new Promise<void>((resolve) => {
			const intervalId = setInterval(() => {
				const elapsedTime = Date.now() - startTime;
				let progress = (elapsedTime / duration) * 100;
				if (!$myFiles[idx]) {
					clearInterval(intervalId);
					resolve();
				} else if (progress >= 100 || elapsedTime > 10000) {
					console.log(`Finished uploading file ${$myFiles[idx].file.name}`);
					$myFiles[idx].progress = 100;
					$myFiles[idx].status = UploadStatus.COMPLETE;
					clearInterval(intervalId);
					resolve();
				} else {
					$myFiles[idx].status = UploadStatus.UPLOADING;
					$myFiles[idx].progress = progress;
				}
			}, 100); // update every 100 milliseconds
		});
	}
	async function fakeUploadProgress() {
		for (const [index, file] of $myFiles.entries()) {
			if (file.progress === undefined && file.status === UploadStatus.PENDING) {
				await fakeUpload(index, 2000);
			}
		}
	}
	async function handleFileClick(file: PickerPreviewFile) {
		if (file.status === UploadStatus.COMPLETE) {
			// remove file
            myFiles.set([])
            console.log('Remove Completed File');
		} else if (file.status === UploadStatus.FAILED) {
			// retry
			console.log('Retry Failed Upload');
		} else if (file.status === UploadStatus.UPLOADING || file.status === UploadStatus.PENDING) {
			// cancel
            myFiles.set([])
			console.log('Cancel Upload Function');
		} else if (file.status === UploadStatus.REJECTED) {
			// remove file
            myFiles.set([])
			console.log('Remove Rejected File');
		}
	}
</script>

<FilePicker
	name="file-picker-5"
	files={$myFiles}
	{onDrop}
	multiple
	accept="image/*"
	allowedExtensions={['png', 'jpg', 'jpeg', 'gif']}
	class="max-w-xl"
>
	<FilePicker.Icon slot="icon" data={	'<svg style="width:24px;height:24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cloud-upload</title><path d="M11 20H6.5Q4.22 20 2.61 18.43 1 16.85 1 14.58 1 12.63 2.17 11.1 3.35 9.57 5.25 9.15 5.88 6.85 7.75 5.43 9.63 4 12 4 14.93 4 16.96 6.04 19 8.07 19 11 20.73 11.2 21.86 12.5 23 13.78 23 15.5 23 17.38 21.69 18.69 20.38 20 18.5 20H13V12.85L14.6 14.4L16 13L12 9L8 13L9.4 14.4L11 12.85Z" /></svg> '   } />
	<FilePicker.Title slot="title">Upload multiple images</FilePicker.Title>
	<FilePicker.Description slot="description">
		Drag & Drop an image to preview it
	</FilePicker.Description>
</FilePicker>

<br />

{#if $myFiles.length > 0}
	<div transition:fade class="w-full max-w-xl">
		<FilePreview bordered class="rounded-md">
			{#each $myFiles as currentFile (currentFile.src)}
				{@const { file, src, progress, status } = currentFile}
				<div transition:slide|local>
					<FilePreview.Item
						class="flex flex-row cursor-pointer"
						on:click={() => handleFileClick(currentFile)}
					>
						<FilePreview.Item.Leading slot="leading" class="h-8 w-8 min-w-[2rem] min-h-[2rem]">
							{#if file.type.startsWith('image/')}
								<FilePreview.Item.Leading.Avatar slot="avatar" size="sm" {src} alt={file.name} />
							{:else}
								<FilePreview.Item.Leading.Icon slot="icon" data={	'<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z" /></svg>'                                } class="h-5 w-5" />
							{/if}
						</FilePreview.Item.Leading>

						<FilePreview.Item.FileContent slot="file-content">
							<FilePreview.Item.FileContent.Title slot="title">
								{file.name}
							</FilePreview.Item.FileContent.Title>
							<FilePreview.Item.FileContent.Description slot="description">
								{formatFileSize(file.size)}
							</FilePreview.Item.FileContent.Description>
						</FilePreview.Item.FileContent>

						<FilePreview.Item.UploadContent slot="upload-content">
							<FilePreview.Item.UploadContent.Status slot="status">
								{#if status === UploadStatus.FAILED}
									Upload Failed
								{:else if status === UploadStatus.COMPLETE}
									Upload Complete
								{:else if status === UploadStatus.UPLOADING}
									Uploading {#if progress}{progress.toFixed(0)}%{:else}0%{/if}
								{:else if status === UploadStatus.REJECTED}
									Upload Rejected
								{:else if status === UploadStatus.PENDING}
									Pending Upload
								{/if}
							</FilePreview.Item.UploadContent.Status>
							<FilePreview.Item.UploadContent.Action slot="action">
								{#if status === UploadStatus.FAILED}
									Tap to retry
								{:else if status === UploadStatus.COMPLETE}
									Tap to undo
								{:else if status === UploadStatus.UPLOADING}
									Tap to cancel
								{:else if status === UploadStatus.REJECTED}
									Tap to remove
								{:else if status === UploadStatus.PENDING}
									Tap to cancel
								{/if}
							</FilePreview.Item.UploadContent.Action>
						</FilePreview.Item.UploadContent>

						<FilePreview.Item.Extra
							slot="extra"
							placement="center"
							class="justify-center items-center flex"
						>
							{#if status === UploadStatus.FAILED}
								<FilePreview.Item.Extra.Failed />
							{:else if status === UploadStatus.COMPLETE}
								<FilePreview.Item.Extra.Complete />
							{:else if status === UploadStatus.UPLOADING && progress !== undefined}
								<FilePreview.Item.Extra.Uploading {progress} />
							{:else if status === UploadStatus.REJECTED}
								<FilePreview.Item.Extra.Rejected />
							{:else if status === UploadStatus.PENDING}
								<FilePreview.Item.Extra.Pending />
							{/if}
						</FilePreview.Item.Extra>
					</FilePreview.Item>
				</div>
			{/each}
		</FilePreview>
	</div>
{/if}
