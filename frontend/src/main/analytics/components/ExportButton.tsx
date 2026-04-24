type ExportButtonProps = {
  href: string;
};

export function ExportButton({ href }: ExportButtonProps) {
  return (
    <div className="export-button">
      <a className="primary-button" href={href}>
        Экспортировать в PDF
      </a>
    </div>
  );
}
