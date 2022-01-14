import React from "react";

// Apps

import vueIcon from "@liara/platformicons/svg/vue.svg";
import phpIcon from "@liara/platformicons/svg/php.svg";
import nodeIcon from "@liara/platformicons/svg/nodejs.svg";
import reactIcon from "@liara/platformicons/svg/react.svg";
import flaskIcon from "@liara/platformicons/svg/flask.svg";
import staticIcon from "@liara/platformicons/svg/HTML5.svg";
import dockerIcon from "@liara/platformicons/svg/docker.svg";
import djangoIcon from "@liara/platformicons/svg/django.svg";
import netcoreIcon from "@liara/platformicons/svg/dotnet.svg";
import laravelIcon from "@liara/platformicons/svg/laravel.svg";
import angularIcon from "@liara/platformicons/svg/angularjs.svg";

const types = [
  // Apps
  { logo: phpIcon, alt: "php" },
  { logo: vueIcon, alt: "vue" },
  { logo: flaskIcon, alt: "flask" },
  { logo: nodeIcon, alt: "node" },
  { logo: reactIcon, alt: "react" },
  { logo: staticIcon, alt: "static" },
  { logo: dockerIcon, alt: "docker" },
  { logo: djangoIcon, alt: "django" },
  { logo: laravelIcon, alt: "laravel" },
  { logo: netcoreIcon, alt: "netcore" },
  { logo: angularIcon, alt: "angular" },
];
export default function PlatformIcon({ platform }) {
  const type = types.find((type) => type.alt === platform);
  return <img className="icon-platform" src={type.logo} />;
}
