/// <reference types="cypress" />
const uploadFile = (fileContent: BlobPart, fileName: string, fileType: any) => {
  const file = new File([fileContent], fileName, { type: fileType });
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);

  cy.get('input[type="file"]').then((input) => {
    const inputElement = input[0];
    (inputElement as HTMLInputElement).files = dataTransfer.files;
    cy.wrap(inputElement).trigger('change', { force: true });
  });
};

describe('File upload', () => {
  const errorMessages = {
    fileTooBig: 'File size exceeds limit of 10GB',
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('handles file upload', () => {
    const fileName = 'test.txt';
    const fileType = 'text/plain';
    const fileContent = 'test';

    uploadFile(fileContent, fileName, fileType);

    cy.get('form').submit();

    cy.get('[data-testid="filename"]').should('exist');
    cy.get('[data-testid="hash"]').should('exist');
    cy.get('console.error').should('not.exist');
  });

  it('displays an error message for large files', () => {
    const fileName = 'largefile.txt';
    const fileType = 'text/plain';
    const fileContent = 'a'.repeat(1024 * 1024 * 51); // 51MB file

    uploadFile(fileContent, fileName, fileType);

    cy.get('button[type="submit"]').should('be.disabled');
    cy.contains(errorMessages.fileTooBig).should('exist');
    cy.get('[data-testid="filename"]').should('not.exist');
    cy.get('[data-testid="hash"]').should('not.exist');
  });

  it('ensures XSS protection in description area', () => {
    const fileName = 'test.txt';
    const fileType = 'text/plain';
    const fileContent = 'test';
    const xssPayload = '<script>alert("XSS")</script>';

    cy.get('[data-testid="description-textarea"]').type(xssPayload);
    cy.get('[data-testid="description-textarea"]').should(
      'have.value',
      xssPayload
    );

    uploadFile(fileContent, fileName, fileType);

    cy.get('form').submit();

    cy.get('[data-testid="filename"]').should('exist');
    cy.get('[data-testid="hash"]').should('exist');
    cy.get('[data-testid="description-textarea"]').should('not.exist');
    cy.get('[data-testid="description"]').should('not.exist');
  });

  it('sanitizes potential command injection in filename', () => {
    const commandInjectionFileName = 'file.txt; rm -rf /';
    const fileType = 'text/plain';
    const fileContent = 'test';

    uploadFile(fileContent, commandInjectionFileName, fileType);

    cy.get('form').submit();
    cy.get(`input[value="${commandInjectionFileName}"]`).should('not.exist');
  });

  it('sanitizes potential path traversal in filename', () => {
    const pathTraversalFileName = '../path_traversal.txt';
    const fileType = 'text/plain';
    const fileContent = 'test content';

    uploadFile(fileContent, pathTraversalFileName, fileType);

    cy.get('form').submit();
    cy.get('input[type="file"]').should('contain.value', 'path_traversal.txt');
  });
});
