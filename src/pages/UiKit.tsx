import {
  Box,
  Flex,
  Grid,
  Container,
  Section,
  Heading,
  Text,
  Em,
  Strong,
  Code,
  Blockquote,
  Link,
  Button,
  IconButton,
  Badge,
  Avatar,
  Callout,
  Card,
  TextField,
  TextArea,
  Select,
  Checkbox,
  Switch,
  RadioGroup,
  Slider,
  RadioCards,
  SegmentedControl,
  Tabs,
  TabNav,
  Table,
  DataList,
  Progress,
  Spinner,
  Skeleton,
  Dialog,
  AlertDialog,
  DropdownMenu,
  ContextMenu,
  Popover,
  HoverCard,
  Tooltip,
  ScrollArea,
  Separator,
} from '@radix-ui/themes'
import {
  MagnifyingGlassIcon,
  PlusIcon,
  DotsHorizontalIcon,
  Pencil1Icon,
  TrashIcon,
  Share1Icon,
  DownloadIcon,
  InfoCircledIcon,
  ExclamationTriangleIcon,
  CheckCircledIcon,
  GearIcon,
  BookmarkIcon,
} from '@radix-ui/react-icons'

const colors = ['purple', 'blue', 'green', 'red', 'orange'] as const
const sizes = ['1', '2', '3'] as const
const variants = ['solid', 'soft', 'outline', 'ghost'] as const

export default function UiKit() {
  return (
    <Container size="4" p="6">
      <Flex direction="column" gap="8">
        <Heading size="8">UI Kit — Radix Themes</Heading>

        {/* ───── Typography ───── */}
        <Section size="1">
          <Heading size="6" mb="4">Typography</Heading>
          <Flex direction="column" gap="3">
            {(['9','8','7','6','5','4','3','2','1'] as const).map(s => (
              <Heading key={s} size={s}>Heading size {s}</Heading>
            ))}
            <Text size="5">Text size 5 — body large</Text>
            <Text size="3">Text size 3 — body default</Text>
            <Text size="2" color="gray">Text size 2 — secondary</Text>
            <Text size="1" color="gray">Text size 1 — caption</Text>
            <Text>
              Regular, <Strong>Strong</Strong>, <Em>Emphasis</Em>, <Code>Code</Code>, <Link href="#">Link</Link>
            </Text>
            <Blockquote>This is a blockquote — used for callouts or quotes.</Blockquote>
          </Flex>
        </Section>

        <Separator size="4" />

        {/* ───── Buttons ───── */}
        <Section size="1">
          <Heading size="6" mb="4">Buttons</Heading>

          {variants.map(variant => (
            <Box key={variant} mb="4">
              <Text size="2" weight="medium" mb="2" as="p">variant="{variant}"</Text>
              <Flex gap="2" wrap="wrap" align="center">
                {sizes.map(size =>
                  colors.map(color => (
                    <Button key={`${variant}-${size}-${color}`} variant={variant} size={size} color={color}>
                      {color} {size}
                    </Button>
                  ))
                )}
              </Flex>
            </Box>
          ))}

          <Text size="2" weight="medium" mb="2" as="p">IconButton</Text>
          <Flex gap="2" wrap="wrap" align="center">
            <IconButton size="1"><MagnifyingGlassIcon /></IconButton>
            <IconButton size="2"><PlusIcon /></IconButton>
            <IconButton size="3"><GearIcon /></IconButton>
            <IconButton variant="soft"><Pencil1Icon /></IconButton>
            <IconButton variant="outline"><TrashIcon /></IconButton>
            <IconButton variant="ghost"><DotsHorizontalIcon /></IconButton>
          </Flex>
        </Section>

        <Separator size="4" />

        {/* ───── Badges ───── */}
        <Section size="1">
          <Heading size="6" mb="4">Badges</Heading>
          <Flex gap="2" wrap="wrap">
            {colors.map(c => <Badge key={c} color={c}>{c}</Badge>)}
            {colors.map(c => <Badge key={`${c}-o`} color={c} variant="outline">{c} outline</Badge>)}
            {colors.map(c => <Badge key={`${c}-s`} color={c} variant="surface">{c} surface</Badge>)}
          </Flex>
        </Section>

        <Separator size="4" />

        {/* ───── Avatars ───── */}
        <Section size="1">
          <Heading size="6" mb="4">Avatars</Heading>
          <Flex gap="3" align="center">
            <Avatar size="1" fallback="A" color="purple" />
            <Avatar size="2" fallback="B" color="blue" />
            <Avatar size="3" fallback="C" color="green" />
            <Avatar size="4" fallback="D" color="red" />
            <Avatar size="5" fallback="E" color="orange" />
            <Avatar size="3" src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=64&h=64&fit=crop" fallback="U" />
          </Flex>
        </Section>

        <Separator size="4" />

        {/* ───── Callouts ───── */}
        <Section size="1">
          <Heading size="6" mb="4">Callouts</Heading>
          <Flex direction="column" gap="3">
            <Callout.Root color="blue">
              <Callout.Icon><InfoCircledIcon /></Callout.Icon>
              <Callout.Text>This is an informational callout.</Callout.Text>
            </Callout.Root>
            <Callout.Root color="orange">
              <Callout.Icon><ExclamationTriangleIcon /></Callout.Icon>
              <Callout.Text>This is a warning callout.</Callout.Text>
            </Callout.Root>
            <Callout.Root color="green">
              <Callout.Icon><CheckCircledIcon /></Callout.Icon>
              <Callout.Text>This is a success callout.</Callout.Text>
            </Callout.Root>
            <Callout.Root color="red">
              <Callout.Icon><ExclamationTriangleIcon /></Callout.Icon>
              <Callout.Text>This is an error callout.</Callout.Text>
            </Callout.Root>
          </Flex>
        </Section>

        <Separator size="4" />

        {/* ───── Cards ───── */}
        <Section size="1">
          <Heading size="6" mb="4">Cards</Heading>
          <Grid columns="3" gap="4">
            <Card>
              <Flex direction="column" gap="2">
                <Heading size="3">Basic Card</Heading>
                <Text size="2" color="gray">A simple card with text content.</Text>
              </Flex>
            </Card>
            <Card>
              <Flex direction="column" gap="2">
                <Box style={{ height: 80, background: 'var(--accent-3)', borderRadius: 'var(--radius-2)' }} />
                <Heading size="3">Card with Image</Heading>
                <Text size="2" color="gray">This card has a placeholder image area.</Text>
              </Flex>
            </Card>
            <Card variant="ghost">
              <Flex direction="column" gap="2">
                <Heading size="3">Ghost Card</Heading>
                <Text size="2" color="gray">A card with variant="ghost".</Text>
              </Flex>
            </Card>
          </Grid>
        </Section>

        <Separator size="4" />

        {/* ───── Form Controls ───── */}
        <Section size="1">
          <Heading size="6" mb="4">Form Controls</Heading>
          <Grid columns="2" gap="6">
            <Flex direction="column" gap="3">
              <Text size="2" weight="medium">TextField</Text>
              <TextField.Root placeholder="Default" />
              <TextField.Root placeholder="With icon">
                <TextField.Slot><MagnifyingGlassIcon /></TextField.Slot>
              </TextField.Root>
              <TextField.Root placeholder="Disabled" disabled />

              <Text size="2" weight="medium" mt="2">TextArea</Text>
              <TextArea placeholder="Type something..." />

              <Text size="2" weight="medium" mt="2">Select</Text>
              <Select.Root defaultValue="apple">
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="apple">Apple</Select.Item>
                  <Select.Item value="banana">Banana</Select.Item>
                  <Select.Item value="cherry">Cherry</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex direction="column" gap="3">
              <Text size="2" weight="medium">Checkbox</Text>
              <Flex direction="column" gap="2">
                <Text as="label" size="2"><Flex gap="2" align="center"><Checkbox defaultChecked /> Checked</Flex></Text>
                <Text as="label" size="2"><Flex gap="2" align="center"><Checkbox /> Unchecked</Flex></Text>
              </Flex>

              <Text size="2" weight="medium" mt="2">Switch</Text>
              <Flex direction="column" gap="2">
                <Text as="label" size="2"><Flex gap="2" align="center"><Switch defaultChecked /> Enabled</Flex></Text>
                <Text as="label" size="2"><Flex gap="2" align="center"><Switch /> Disabled</Flex></Text>
              </Flex>

              <Text size="2" weight="medium" mt="2">RadioGroup</Text>
              <RadioGroup.Root defaultValue="1">
                <Flex direction="column" gap="1">
                  <Text as="label" size="2"><Flex gap="2" align="center"><RadioGroup.Item value="1" /> Option 1</Flex></Text>
                  <Text as="label" size="2"><Flex gap="2" align="center"><RadioGroup.Item value="2" /> Option 2</Flex></Text>
                  <Text as="label" size="2"><Flex gap="2" align="center"><RadioGroup.Item value="3" /> Option 3</Flex></Text>
                </Flex>
              </RadioGroup.Root>

              <Text size="2" weight="medium" mt="2">Slider</Text>
              <Slider defaultValue={[50]} />
            </Flex>
          </Grid>
        </Section>

        <Separator size="4" />

        {/* ───── RadioCards ───── */}
        <Section size="1">
          <Heading size="6" mb="4">RadioCards</Heading>
          <RadioCards.Root defaultValue="1" columns="3">
            <RadioCards.Item value="1">
              <Flex direction="column" width="100%">
                <Text weight="bold">Starter</Text>
                <Text size="2" color="gray">Free forever</Text>
              </Flex>
            </RadioCards.Item>
            <RadioCards.Item value="2">
              <Flex direction="column" width="100%">
                <Text weight="bold">Pro</Text>
                <Text size="2" color="gray">$19/month</Text>
              </Flex>
            </RadioCards.Item>
            <RadioCards.Item value="3">
              <Flex direction="column" width="100%">
                <Text weight="bold">Enterprise</Text>
                <Text size="2" color="gray">Custom pricing</Text>
              </Flex>
            </RadioCards.Item>
          </RadioCards.Root>
        </Section>

        <Separator size="4" />

        {/* ───── SegmentedControl ───── */}
        <Section size="1">
          <Heading size="6" mb="4">SegmentedControl</Heading>
          <SegmentedControl.Root defaultValue="inbox">
            <SegmentedControl.Item value="inbox">Inbox</SegmentedControl.Item>
            <SegmentedControl.Item value="sent">Sent</SegmentedControl.Item>
            <SegmentedControl.Item value="drafts">Drafts</SegmentedControl.Item>
          </SegmentedControl.Root>
        </Section>

        <Separator size="4" />

        {/* ───── Tabs ───── */}
        <Section size="1">
          <Heading size="6" mb="4">Tabs</Heading>
          <Tabs.Root defaultValue="account">
            <Tabs.List>
              <Tabs.Trigger value="account">Account</Tabs.Trigger>
              <Tabs.Trigger value="security">Security</Tabs.Trigger>
              <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
            </Tabs.List>
            <Box pt="3">
              <Tabs.Content value="account"><Text>Account settings content.</Text></Tabs.Content>
              <Tabs.Content value="security"><Text>Security settings content.</Text></Tabs.Content>
              <Tabs.Content value="notifications"><Text>Notification preferences content.</Text></Tabs.Content>
            </Box>
          </Tabs.Root>
        </Section>

        <Separator size="4" />

        {/* ───── TabNav ───── */}
        <Section size="1">
          <Heading size="6" mb="4">TabNav</Heading>
          <TabNav.Root>
            <TabNav.Link href="#" active>Overview</TabNav.Link>
            <TabNav.Link href="#">Analytics</TabNav.Link>
            <TabNav.Link href="#">Settings</TabNav.Link>
          </TabNav.Root>
        </Section>

        <Separator size="4" />

        {/* ───── Table ───── */}
        <Section size="1">
          <Heading size="6" mb="4">Table</Heading>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.RowHeaderCell>Alice</Table.RowHeaderCell>
                <Table.Cell>alice@example.com</Table.Cell>
                <Table.Cell><Badge color="purple">Admin</Badge></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.RowHeaderCell>Bob</Table.RowHeaderCell>
                <Table.Cell>bob@example.com</Table.Cell>
                <Table.Cell><Badge color="blue">Editor</Badge></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.RowHeaderCell>Charlie</Table.RowHeaderCell>
                <Table.Cell>charlie@example.com</Table.Cell>
                <Table.Cell><Badge color="green">Viewer</Badge></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Section>

        <Separator size="4" />

        {/* ───── DataList ───── */}
        <Section size="1">
          <Heading size="6" mb="4">DataList</Heading>
          <DataList.Root>
            <DataList.Item>
              <DataList.Label>Status</DataList.Label>
              <DataList.Value><Badge color="green">Active</Badge></DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Name</DataList.Label>
              <DataList.Value>Impulse Web</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Created</DataList.Label>
              <DataList.Value>April 16, 2026</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Version</DataList.Label>
              <DataList.Value>1.0.0</DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </Section>

        <Separator size="4" />

        {/* ───── Progress / Spinner / Skeleton ───── */}
        <Section size="1">
          <Heading size="6" mb="4">Progress, Spinner, Skeleton</Heading>
          <Flex direction="column" gap="4">
            <Box>
              <Text size="2" weight="medium" mb="2" as="p">Progress</Text>
              <Flex direction="column" gap="2">
                <Progress value={25} />
                <Progress value={60} />
                <Progress value={100} />
              </Flex>
            </Box>
            <Box>
              <Text size="2" weight="medium" mb="2" as="p">Spinner</Text>
              <Flex gap="3" align="center">
                <Spinner size="1" />
                <Spinner size="2" />
                <Spinner size="3" />
              </Flex>
            </Box>
            <Box>
              <Text size="2" weight="medium" mb="2" as="p">Skeleton</Text>
              <Flex direction="column" gap="2">
                <Skeleton><Text size="3">Loading placeholder text...</Text></Skeleton>
                <Skeleton><Text size="2">Another line of skeleton content.</Text></Skeleton>
                <Flex gap="2">
                  <Skeleton><Avatar size="3" fallback="X" /></Skeleton>
                  <Skeleton><Button>Button</Button></Skeleton>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Section>

        <Separator size="4" />

        {/* ───── Dialog ───── */}
        <Section size="1">
          <Heading size="6" mb="4">Dialog</Heading>
          <Flex gap="3">
            <Dialog.Root>
              <Dialog.Trigger>
                <Button>Open Dialog</Button>
              </Dialog.Trigger>
              <Dialog.Content maxWidth="450px">
                <Dialog.Title>Edit Profile</Dialog.Title>
                <Dialog.Description size="2" mb="4">Make changes to your profile.</Dialog.Description>
                <Flex direction="column" gap="3">
                  <TextField.Root placeholder="Display name" defaultValue="Alice" />
                  <TextArea placeholder="Bio" defaultValue="Hello, world!" />
                </Flex>
                <Flex gap="3" mt="4" justify="end">
                  <Dialog.Close>
                    <Button variant="soft" color="gray">Cancel</Button>
                  </Dialog.Close>
                  <Dialog.Close>
                    <Button>Save</Button>
                  </Dialog.Close>
                </Flex>
              </Dialog.Content>
            </Dialog.Root>

            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button color="red" variant="soft">Delete Account</Button>
              </AlertDialog.Trigger>
              <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Delete Account</AlertDialog.Title>
                <AlertDialog.Description size="2">
                  Are you sure? This action cannot be undone.
                </AlertDialog.Description>
                <Flex gap="3" mt="4" justify="end">
                  <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">Cancel</Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                    <Button color="red">Delete</Button>
                  </AlertDialog.Action>
                </Flex>
              </AlertDialog.Content>
            </AlertDialog.Root>
          </Flex>
        </Section>

        <Separator size="4" />

        {/* ───── DropdownMenu ───── */}
        <Section size="1">
          <Heading size="6" mb="4">DropdownMenu</Heading>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="soft">
                Options <DropdownMenu.TriggerIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item><Pencil1Icon /> Edit</DropdownMenu.Item>
              <DropdownMenu.Item><Share1Icon /> Share</DropdownMenu.Item>
              <DropdownMenu.Item><DownloadIcon /> Download</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item><BookmarkIcon /> Bookmark</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item color="red"><TrashIcon /> Delete</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Section>

        <Separator size="4" />

        {/* ───── ContextMenu ───── */}
        <Section size="1">
          <Heading size="6" mb="4">ContextMenu</Heading>
          <ContextMenu.Root>
            <ContextMenu.Trigger>
              <Card style={{ minHeight: 80 }}>
                <Flex align="center" justify="center" style={{ minHeight: 80 }}>
                  <Text size="2" color="gray">Right-click here</Text>
                </Flex>
              </Card>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
              <ContextMenu.Item>Copy</ContextMenu.Item>
              <ContextMenu.Item>Paste</ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Item>Inspect</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>
        </Section>

        <Separator size="4" />

        {/* ───── Popover ───── */}
        <Section size="1">
          <Heading size="6" mb="4">Popover</Heading>
          <Popover.Root>
            <Popover.Trigger>
              <Button variant="soft">Open Popover</Button>
            </Popover.Trigger>
            <Popover.Content width="300px">
              <Flex direction="column" gap="3">
                <Text size="2" weight="medium">Quick Note</Text>
                <TextArea placeholder="Write a note..." />
                <Popover.Close>
                  <Button size="1">Save</Button>
                </Popover.Close>
              </Flex>
            </Popover.Content>
          </Popover.Root>
        </Section>

        <Separator size="4" />

        {/* ───── HoverCard ───── */}
        <Section size="1">
          <Heading size="6" mb="4">HoverCard</Heading>
          <HoverCard.Root>
            <HoverCard.Trigger>
              <Link href="#">Hover over me</Link>
            </HoverCard.Trigger>
            <HoverCard.Content>
              <Flex gap="3">
                <Avatar size="3" fallback="R" color="purple" />
                <Flex direction="column">
                  <Text size="2" weight="bold">Radix UI</Text>
                  <Text size="2" color="gray">Open-source UI component library</Text>
                </Flex>
              </Flex>
            </HoverCard.Content>
          </HoverCard.Root>
        </Section>

        <Separator size="4" />

        {/* ───── Tooltip ───── */}
        <Section size="1">
          <Heading size="6" mb="4">Tooltip</Heading>
          <Flex gap="3">
            <Tooltip content="Edit item">
              <IconButton variant="soft"><Pencil1Icon /></IconButton>
            </Tooltip>
            <Tooltip content="Share item">
              <IconButton variant="soft"><Share1Icon /></IconButton>
            </Tooltip>
            <Tooltip content="Download item">
              <IconButton variant="soft"><DownloadIcon /></IconButton>
            </Tooltip>
            <Tooltip content="Settings">
              <IconButton variant="soft"><GearIcon /></IconButton>
            </Tooltip>
          </Flex>
        </Section>

        <Separator size="4" />

        {/* ───── ScrollArea ───── */}
        <Section size="1">
          <Heading size="6" mb="4">ScrollArea</Heading>
          <Card>
            <ScrollArea style={{ height: 150 }} scrollbars="vertical">
              <Flex direction="column" gap="2" p="2">
                {Array.from({ length: 20 }, (_, i) => (
                  <Text key={i} size="2">Scrollable item {i + 1}</Text>
                ))}
              </Flex>
            </ScrollArea>
          </Card>
        </Section>

        <Separator size="4" />

        {/* ───── Layout (Flex / Grid) ───── */}
        <Section size="1">
          <Heading size="6" mb="4">Layout — Flex & Grid</Heading>

          <Text size="2" weight="medium" mb="2" as="p">Flex (row, gap=3)</Text>
          <Flex gap="3" mb="4">
            {[1,2,3,4].map(i => (
              <Card key={i} style={{ flex: 1 }}>
                <Text size="2" align="center">Flex {i}</Text>
              </Card>
            ))}
          </Flex>

          <Text size="2" weight="medium" mb="2" as="p">Grid (4 columns, gap=3)</Text>
          <Grid columns="4" gap="3">
            {[1,2,3,4,5,6,7,8].map(i => (
              <Card key={i}>
                <Text size="2" align="center">Grid {i}</Text>
              </Card>
            ))}
          </Grid>
        </Section>

        <Box pb="8" />
      </Flex>
    </Container>
  )
}
