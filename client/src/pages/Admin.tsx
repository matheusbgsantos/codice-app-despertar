import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { 
  Plus, Trash2, UserCheck, UserX, Loader2, Shield, 
  Mail, Clock, Webhook, AlertCircle, CheckCircle, XCircle,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

export default function Admin() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [deleteEmail, setDeleteEmail] = useState<string | null>(null);

  // Queries
  const emailsQuery = trpc.admin.listEmails.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  const logsQuery = trpc.admin.listWebhookLogs.useQuery({ limit: 50 }, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  // Mutations
  const addEmailMutation = trpc.admin.addEmail.useMutation({
    onSuccess: () => {
      toast.success("Email adicionado com sucesso!");
      setNewEmail("");
      setNewName("");
      emailsQuery.refetch();
    },
    onError: (err) => {
      toast.error(err.message || "Erro ao adicionar email");
    },
  });

  const activateMutation = trpc.admin.activateEmail.useMutation({
    onSuccess: () => {
      toast.success("Email ativado!");
      emailsQuery.refetch();
    },
  });

  const deactivateMutation = trpc.admin.deactivateEmail.useMutation({
    onSuccess: () => {
      toast.success("Email desativado!");
      emailsQuery.refetch();
    },
  });

  const deleteMutation = trpc.admin.deleteEmail.useMutation({
    onSuccess: () => {
      toast.success("Email removido permanentemente!");
      setDeleteEmail(null);
      emailsQuery.refetch();
    },
  });

  const handleAddEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;
    addEmailMutation.mutate({ 
      email: newEmail.toLowerCase().trim(),
      name: newName || undefined,
    });
  };

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <CardTitle className="text-white">Acesso Restrito</CardTitle>
            <CardDescription className="text-slate-400">
              Faça login para acessar o painel administrativo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => window.location.href = getLoginUrl()}
            >
              Fazer Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Not admin
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700">
          <CardHeader className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-white">Acesso Negado</CardTitle>
            <CardDescription className="text-slate-400">
              Você não tem permissão para acessar esta página.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-500" />
            Painel Administrativo
          </h1>
          <p className="text-slate-400 mt-2">
            Gerencie os emails autorizados e monitore webhooks da Kirvano.
          </p>
        </div>

        <Tabs defaultValue="emails" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="emails" className="data-[state=active]:bg-blue-600">
              <Mail className="w-4 h-4 mr-2" />
              Emails Autorizados
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="data-[state=active]:bg-blue-600">
              <Webhook className="w-4 h-4 mr-2" />
              Logs de Webhook
            </TabsTrigger>
          </TabsList>

          {/* Emails Tab */}
          <TabsContent value="emails" className="space-y-6">
            {/* Add Email Form */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Adicionar Email Manualmente</CardTitle>
                <CardDescription className="text-slate-400">
                  Adicione emails que devem ter acesso ao conteúdo protegido.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddEmail} className="flex flex-col md:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="email@exemplo.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white flex-1"
                  />
                  <Input
                    type="text"
                    placeholder="Nome (opcional)"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white md:w-48"
                  />
                  <Button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={addEmailMutation.isPending}
                  >
                    {addEmailMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Plus className="w-4 h-4 mr-2" />
                    )}
                    Adicionar
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Emails List */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white text-lg">Emails Autorizados</CardTitle>
                  <CardDescription className="text-slate-400">
                    {emailsQuery.data?.length || 0} emails cadastrados
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => emailsQuery.refetch()}
                  className="border-slate-600 text-slate-300"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent>
                {emailsQuery.isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                  </div>
                ) : emailsQuery.data?.length === 0 ? (
                  <Alert className="bg-slate-700 border-slate-600">
                    <AlertDescription className="text-slate-300">
                      Nenhum email cadastrado ainda. Adicione manualmente ou aguarde compras via Kirvano.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-700">
                          <TableHead className="text-slate-400">Email</TableHead>
                          <TableHead className="text-slate-400">Nome</TableHead>
                          <TableHead className="text-slate-400">Origem</TableHead>
                          <TableHead className="text-slate-400">Status</TableHead>
                          <TableHead className="text-slate-400">Data</TableHead>
                          <TableHead className="text-slate-400 text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {emailsQuery.data?.map((item) => (
                          <TableRow key={item.id} className="border-slate-700">
                            <TableCell className="text-white font-medium">
                              {item.email}
                            </TableCell>
                            <TableCell className="text-slate-300">
                              {item.name || "-"}
                            </TableCell>
                            <TableCell>
                              <Badge variant={item.addedBy === "webhook" ? "default" : "secondary"}>
                                {item.addedBy === "webhook" ? "Kirvano" : "Manual"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {item.isActive ? (
                                <Badge className="bg-green-600">Ativo</Badge>
                              ) : (
                                <Badge variant="destructive">Inativo</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-slate-400 text-sm">
                              {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                {item.isActive ? (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => deactivateMutation.mutate({ email: item.email })}
                                    className="text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10"
                                  >
                                    <UserX className="w-4 h-4" />
                                  </Button>
                                ) : (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => activateMutation.mutate({ email: item.email })}
                                    className="text-green-500 hover:text-green-400 hover:bg-green-500/10"
                                  >
                                    <UserCheck className="w-4 h-4" />
                                  </Button>
                                )}
                                <Dialog open={deleteEmail === item.email} onOpenChange={(open) => !open && setDeleteEmail(null)}>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setDeleteEmail(item.email)}
                                      className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="bg-slate-800 border-slate-700">
                                    <DialogHeader>
                                      <DialogTitle className="text-white">Confirmar exclusão</DialogTitle>
                                      <DialogDescription className="text-slate-400">
                                        Tem certeza que deseja remover permanentemente o email <strong>{item.email}</strong>?
                                      </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                      <Button variant="outline" onClick={() => setDeleteEmail(null)}>
                                        Cancelar
                                      </Button>
                                      <Button 
                                        variant="destructive"
                                        onClick={() => deleteMutation.mutate({ email: item.email })}
                                        disabled={deleteMutation.isPending}
                                      >
                                        {deleteMutation.isPending ? (
                                          <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                          "Excluir"
                                        )}
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Webhooks Tab */}
          <TabsContent value="webhooks" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white text-lg">Logs de Webhook</CardTitle>
                  <CardDescription className="text-slate-400">
                    Histórico de notificações recebidas da Kirvano.
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => logsQuery.refetch()}
                  className="border-slate-600 text-slate-300"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent>
                {logsQuery.isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                  </div>
                ) : logsQuery.data?.length === 0 ? (
                  <Alert className="bg-slate-700 border-slate-600">
                    <Clock className="w-4 h-4" />
                    <AlertDescription className="text-slate-300">
                      Nenhum webhook recebido ainda. Configure o webhook na Kirvano para começar a receber notificações.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-700">
                          <TableHead className="text-slate-400">Evento</TableHead>
                          <TableHead className="text-slate-400">Email</TableHead>
                          <TableHead className="text-slate-400">ID Venda</TableHead>
                          <TableHead className="text-slate-400">Status</TableHead>
                          <TableHead className="text-slate-400">Data</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {logsQuery.data?.map((log) => (
                          <TableRow key={log.id} className="border-slate-700">
                            <TableCell>
                              <Badge variant="outline" className="border-slate-600 text-slate-300">
                                {log.event}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-white">
                              {log.customerEmail || "-"}
                            </TableCell>
                            <TableCell className="text-slate-400 font-mono text-sm">
                              {log.saleId || "-"}
                            </TableCell>
                            <TableCell>
                              {log.processed ? (
                                <div className="flex items-center gap-1 text-green-500">
                                  <CheckCircle className="w-4 h-4" />
                                  <span className="text-sm">OK</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1 text-red-500">
                                  <XCircle className="w-4 h-4" />
                                  <span className="text-sm" title={log.errorMessage || ""}>Erro</span>
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="text-slate-400 text-sm">
                              {new Date(log.createdAt).toLocaleString("pt-BR")}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
