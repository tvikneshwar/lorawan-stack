// Copyright © 2018 The Things Network Foundation, distributed under the MIT license (see LICENSE file)

package commands

import (
	"github.com/TheThingsNetwork/ttn/pkg/component"
	"github.com/TheThingsNetwork/ttn/pkg/gatewayserver"
	"github.com/spf13/cobra"
)

var (
	startCommand = &cobra.Command{
		Use:   "start",
		Short: "Start the Gateway Server",
		RunE: func(cmd *cobra.Command, args []string) error {
			c := component.New(logger, &component.Config{ServiceBase: config.ServiceBase})

			gs, err := gatewayserver.New(c, &config.GS)
			if err != nil {
				return err
			}
			_ = gs

			logger.Info("Gateway server initialized, starting...")
			return c.Run()
		},
	}
)

func init() {
	Root.AddCommand(startCommand)
}
