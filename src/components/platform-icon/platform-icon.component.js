import React from "react";

import vueIcon from "@liara/platformicons/png/vue.png";
import phpIcon from "@liara/platformicons/png/php.png";
import nodeIcon from "@liara/platformicons/png/node.png";
import reactIcon from "@liara/platformicons/png/react.png";
import flaskIcon from "@liara/platformicons/png/flask.png";
import staticIcon from "@liara/platformicons/png/static.png";
import dockerIcon from "@liara/platformicons/png/docker.png";
import djangoIcon from "@liara/platformicons/png/django.png";
import netcoreIcon from "@liara/platformicons/png/dotnet.png";
import laravelIcon from "@liara/platformicons/png/laravel.png";
import angularIcon from "@liara/platformicons/png/angular.png";
import nextIcon from "@liara/platformicons/png/next.png";
import { PlatformContaienr } from "./platform-icon.styles";

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
  { logo: nextIcon, alt: "next" }
];

const PlatfromIcon = ({ platform }) => {
  const type = types.find(type => type.alt === platform);
  return <PlatformContaienr src={type.logo} draggable="false" />;
};

export default PlatfromIcon;
