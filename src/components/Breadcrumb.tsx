import { Link } from "react-router-dom";

const Breadcrumb = (props: { pageName: string }) => {
  return (
    <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="font-semibold text-black text-title-md2 dark:text-white">
        {props.pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link to="/dashboard/home/read">Dashboard /</Link>
          </li>
          <li className="text-primary">{props.pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
