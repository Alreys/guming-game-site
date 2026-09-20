#!/usr/bin/env bash
# 将 website/dist 部署到 EdgeOne Pages(国内直连、免备案官方子域名)。
#
# 用法:
#   ./scripts/deploy-edgeone.sh                    # 使用 CLI 已登录会话(先执行: npx edgeone login -s china)
#   EDGEONE_TOKEN=xxx ./scripts/deploy-edgeone.sh  # 非交互:使用 EdgeOne API Token
#   ./scripts/deploy-edgeone.sh --anonymous china  # 匿名临时预览(无需账号,事后在控制台 claim)
set -euo pipefail
cd "$(dirname "$0")/.."

PROJECT_NAME="${EDGEONE_PROJECT_NAME:-guming-game-site}"
EXTRA_ARGS=()

if [[ "${1:-}" == "--anonymous" ]]; then
  EXTRA_ARGS+=(--anonymous)
  case "${2:-china}" in
    china|global) EXTRA_ARGS+=(--site "$2") ;;
  esac
elif [[ -n "${EDGEONE_TOKEN:-}" ]]; then
  EXTRA_ARGS+=(--token "$EDGEONE_TOKEN")
fi

npx -y edgeone pages deploy dist --name "$PROJECT_NAME" --area global "${EXTRA_ARGS[@]}"
