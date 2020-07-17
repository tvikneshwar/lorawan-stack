---
title: "Adding Webhook Templates"
description: ""
weight: 4
---

{{% tts %}} uses webhook templates from the [`lorawan-webhook-templates` Github repository](https://github.com/TheThingsNetwork/lorawan-webhook-templates/).

Once you have created a new webhook template with a proper [format]({{< ref "/integrations/webhooks/webhook-templates/format.md" >}}), you can easily build it locally by following next steps:

1. Clone the [`lorawan-webhook-templates` Github repository](https://github.com/TheThingsNetwork/lorawan-webhook-templates/) to a local folder.

2. Store your webhook template in previously mentioned folder.

3. Update your {{% tts %}} configuration by adding following lines:

```yaml
as:
  webhooks:
    templates:
      directory: "path-to-the-folder-containing-your-webhook-template"
```

At this point, you can test your webhook template by [instantiating]({{< ref "/integrations/webhooks/webhook-templates/instantiation.md" >}}) it.

To make your webhook template available in most deployments when the next version is deployed, open a pull request on the [`lorawan-webhook-templates` Github repository](https://github.com/TheThingsNetwork/lorawan-webhook-templates/).