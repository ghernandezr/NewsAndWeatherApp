import { element, by, ElementFinder } from 'protractor';

export class NewsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-news div table .btn-danger'));
  title = element.all(by.css('jhi-news div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class NewsUpdatePage {
  pageTitle = element(by.id('jhi-news-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  authorIdInput = element(by.id('field_authorId'));
  titleInput = element(by.id('field_title'));
  descriptionInput = element(by.id('field_description'));
  cityIdInput = element(by.id('field_cityId'));
  createAtInput = element(by.id('field_createAt'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setAuthorIdInput(authorId: string): Promise<void> {
    await this.authorIdInput.sendKeys(authorId);
  }

  async getAuthorIdInput(): Promise<string> {
    return await this.authorIdInput.getAttribute('value');
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setCityIdInput(cityId: string): Promise<void> {
    await this.cityIdInput.sendKeys(cityId);
  }

  async getCityIdInput(): Promise<string> {
    return await this.cityIdInput.getAttribute('value');
  }

  async setCreateAtInput(createAt: string): Promise<void> {
    await this.createAtInput.sendKeys(createAt);
  }

  async getCreateAtInput(): Promise<string> {
    return await this.createAtInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class NewsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-news-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-news'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
