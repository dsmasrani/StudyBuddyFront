import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { API } from "./api";
@customElement("file-uploader")
class FileUploader extends LitElement {

  file = null;
  isUploading = false; // Added property
  uploadMessage = ''; // Added property

  static styles = css`
    .success{
      background-color: #dff0d8;
      color: #3c763d;
      border: 1px solid #d6e9c6;
      padding: 10px;
      border-radius: 5px;
      background-color: green;
      color: white;
    }
    :host {
      display: block;
      margin: 20px;
    }
    .container {
      display: flex;
      flex-direction: column;
      align-items: flex-start; /* Updated property */
    }
    .input-file {
      margin-bottom: 10px;
    }
    .upload-button {
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      font-family: var(--font-family-roboto);
      transition: background-color 0.3s ease;
      transition: var(--transition-bg-color);
      box-shadow: var(--shadow-color);
      text-transform: uppercase;
    }
    .upload-button:hover {
      background-color: var(--button-color-hover);
    }
    .upload-button:active {
      background-color: var(--button-color);
    }
    .loading-box { /* Added CSS class */
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100px;
      background-color: #f5f5f5;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-top: 10px;
    }
  `;

  constructor() {
    super();
    this.file = null;
    this.isUploading = false;
    this.uploadMessage = '';
  }

  supabase = API.getClient();
  success: string = "";
  _onFileChange(event: Event) { // Added type annotation
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
    }
  }

  async _onSubmit() {
    if (!this.file) {
      alert('Please select a file to upload.');
      return;
    }
    const userID = await API.getUserID();
    this.isUploading = false; // Show loading box
    this.uploadMessage = 'Uploading file...'; // Show uploading message

    const { data, error } = await this.supabase.storage
      .from('files')
      .upload(`${userID}/${this.file.name}`, this.file, {
        cacheControl: '3600',
        upsert: true,
      });

    this.isUploading = true; // Hide loading box

    if (error) {
      this.uploadMessage = `Error uploading file: ${error.message}`; // Show error message
    } else {
      alert('File uploaded successfully');
      this.success="File uploaded successfully: ${data.key}";
      this.uploadMessage = `File uploaded successfully: ${data}`; // Show success message
    }
  }
  render() {
    return html`
      <div class="container">
      <input class="input-file" type="file" accept=".pdf" @change="${this._onFileChange}" />
      <button class="upload-button" @click="${this._onSubmit}">Upload File</button>
      ${this.isUploading ? html`<div class="loading-box">${this.uploadMessage}</div>` : ''}
      ${this.success !== "" ? html`<p class="success">${this.success}</p>` : ''}
      </div>
    `;
  }
}
